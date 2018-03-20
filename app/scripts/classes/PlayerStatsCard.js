/**
 * Player Stats Card Class
 *
   It expects the HTML markup to be created by the backend. Configuration via the data
   attribute on the HTML element ('.playerStatsCard'):
    - data-api-endpoint - URL of the API endpoint to load players data
    - data-stand-alone - if sets to true, the component will grab focus, default: false

  You can have multiple instances of this component working simultanously on the page, 
  all you need to do is to create the HTML markup. JavaSript kicks in automaticaly

 */

class PlayerStatsCard extends Component {

  /***************************************************************/
  /***   Public                ***********************************/
  /***************************************************************/

  constructor( elem, options = {} ) {
    super(elem, { 
      // default options

      standAlone: false,
      // you can hardcode the API endpoint if you wish to
      apiEndpoint: '',
      // path to the images for the component
      imagesPath: 'images/components/playerStatsCard/',
      ...options
    });

    /** properties ************************/

    // attributes
    this.apiEndpoint = this.elem.getAttribute('data-api-endpoint') ? this.elem.getAttribute('data-api-endpoint') : this.options.apiEndpoint;
    this.standAlone = this.elem.getAttribute('data-stand-alone') ? this.elem.getAttribute('data-stand-alone') : this.options.standAlone;

    // DOM elements
    this.select = this.elem.querySelector('select');

    this.photo = this.elem.querySelector('.playerStatsCard__photo');
    this.badge = this.elem.querySelector('.playerStatsCard__badge');

    this.name = this.elem.querySelector('.playerStatsCard__name');
    this.position = this.elem.querySelector('.playerStatsCard__position');
    this.appearances = this.elem.querySelector('.playerStatsCard__appearances .playerStatsCard__value');
    this.goals = this.elem.querySelector('.playerStatsCard__goals .playerStatsCard__value');
    this.assists = this.elem.querySelector('.playerStatsCard__assists .playerStatsCard__value');
    this.goalsPerMatch = this.elem.querySelector('.playerStatsCard__goalsPerMatch .playerStatsCard__value');
    this.passesPerMinute = this.elem.querySelector('.playerStatsCard__passesPerMinute .playerStatsCard__value');


    /** constructor ************************/
    
    if (!this.apiEndpoint) {
      return;
    }

    // load players
    fetch(this.apiEndpoint)
      .then(response => response.json())
      .then(this._onPlayersLoaded.bind(this))
      .catch(status => console.log('Error loading players data', status));

    // attach event hook to the select box
    this.select.onchange = this._onSelect.bind(this);
  }

  /**
   * init all PlayerStatsCard on the page
   */
  static init(options = {}) {
    for (let elem of document.querySelectorAll('.playerStatsCard')) {
      new PlayerStatsCard(elem, options);
    }  
  }

  /***************************************************************/
  /***   Protected             ***********************************/
  /***************************************************************/

  /**
   * Fired when are players loaded, applies the loaded data to the component
   */
  _onPlayersLoaded(data) {
    if ((!data && !data.players) || !data.players.length ) {
      return; // no players
    }

    this.players = data.players;

    // add players names to the select input
    this.players.forEach((player, i) => {
      this.select.options.add(new Option(player.player.name.first + ' ' + player.player.name.last, i));
    })

    // focus on select if standalone
    if (this.standAlone) {
      this.select.focus();
    }

    // show first player
    this.select.selectedIndex = 1;
    this.select.onchange();
  }

  /**
   * Fired when user selects a player, displays player's data
   */
  _onSelect() {
    if (this.select.value === '-1') {return;}
    
    var player = this.players[this.select.value];

    this.badge.className = 'playerStatsCard__badge playerStatsCard__badge-' + player.player.currentTeam.id;
    this.photo.setAttribute('src', this.options.imagesPath + 'p' + player.player.id + '.png');

    this.photo.setAttribute('alt', player.player.name.first + ' ' + player.player.name.last + ' photo');
    this.name.textContent = player.player.name.first + ' ' + player.player.name.last;
    this.position.textContent = player.player.info.positionInfo;

    // default values for the stats, in case some values not present
    var stats = { 
      appearances: 0,
      goals: 0,
      goal_assist: 0,
      appearances: 0,
      fwd_pass: 0,
      backward_pass: 0,
      mins_played: 0
    };
    // pick up the stats from previously loaded data
    player.stats.reduce((acc, {name, value}) => {
      acc[name] = value; 
      return acc;
    }, stats);

    // calculate and render the stats
    this.appearances.textContent = stats.appearances;
    this.goals.textContent = stats.goals;
    this.assists.textContent = stats.goal_assist;
    this.goalsPerMatch.textContent = Math.round((stats.goals) / (stats.appearances) * 100.0) / 100;
    this.passesPerMinute.textContent = Math.round(((stats.fwd_pass) + (stats.backward_pass)) / (stats.mins_played) * 100.0) / 100;
  }
}
