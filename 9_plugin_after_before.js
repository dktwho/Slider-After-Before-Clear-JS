// =========================== 9. Плагин After / Before JS+CSS ========================== 
function getTemplate(state) {
  return `
  <div class="slider_before" style="width:${state.width}px; background-image: url(${state.after})">
        <div class="slider_resize"  data-type="resize"></div>
      </div>

      <div class="slider_after" style="background-image:url(${state.before})"></div>
  `
}



class Slider {
  constructor(selector, state) {
    this.$slider = document.getElementById(selector)
    this.state = {
      ...state,
      width: state.width || 512
    }
    this.#render(this.state)
    this.#listen()
  }

 
  #render(state) {
    this.$slider.innerHTML = getTemplate(state)
  } ;

  #update(props) {
    this.state = {
      ...this.state,
      ...props,
    }
    this.#render(this.state)
  };


  #listen() {
    this.mouseDownHandler = this.mouseDownHandler.bind(this)
    this.mouseUpHandler = this.mouseUpHandler.bind(this)
    this.moveHandler = this.moveHandler.bind(this)
    this.$slider.addEventListener('mousedown', this.mouseDownHandler)
    this.$slider.addEventListener('mouseup', this.mouseUpHandler)
  }

  mouseDownHandler(event) {
    if (event.target.dataset.type === 'resize') {
      this.$slider.addEventListener('mousemove', this.moveHandler)
      console.log('down')
      this.currentClientX = event.clientX
      
    }
  }

  mouseUpHandler(event) {
    this.$slider.removeEventListener('mousemove', this.moveHandler)
     console.log('up')
   
  }

  moveHandler(event) {
    // console.log('move')
    let  newClientX = this.currentClientX - event.clientX
    this.#update({width: this.state.width - newClientX})
    this.currentClientX = event.clientX
    
  }
  
}

const slider = new Slider('slider', {
  after: './tree1.jpg',
  before: './tree2.jpg'
})
