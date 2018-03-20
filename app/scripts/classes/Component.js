/**
 * Component Class

   Base class for all Components

 */
class Component {

  /***************************************************************/
  /***   Public                ***********************************/
  /***************************************************************/

  constructor( elem, options = {} ) {

    /** properties ************************/

    // default options
    this.defaultOptions = {
    };
    this.options = { ...this.defaultOptions, ...options };

    // base element
    this.elem = elem;
  }

  /***************************************************************/
  /***   Protected             ***********************************/
  /***************************************************************/

}
