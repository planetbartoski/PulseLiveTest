/**
 * Player Stats Card Class
 *
 
 */

class PlayerStatsCard extends Component {

  /***************************************************************/
  /***   Public                ***********************************/
  /***************************************************************/

  constructor( elem, options = {} ) {
    super(elem, { 
        // default options

        // you can hardcode the API endpoint if you wish to
        apiEndpoint: '',

    ...options});

    /** properties ************************/

    this.apiEndpoint = this.elem.getAttribute('api-endpoint') ? this.elem.getAttribute('api-endpoint') : this.options.apiEndpoint;


    /** constructor ************************/

    console.log('playerStatsCard initiated');

  }

  /**
   * init all PlayerStatsCard on the page
   */
  static init(options = {}) {
    for (let elem of document.getElementsByClassName('playerStatsCard')) {
      new PlayerStatsCard(elem, options);
    }  
  }

  /***************************************************************/
  /***   Protected             ***********************************/
  /***************************************************************/

}
