import logo from '../assets/logomk.png';

class AppNav extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
    <div class="flex justify-between">
      <img src="${logo}" alt="logo mortal kombat" class="h-20 w-auto pl-10 pt-6">
      <nav class="nav flex items-center">
        <button class="btn-nav bg-gradient-to-r from-[#E2B077] to-[#EBB43C]" data-section="home">HOME</button>
        <button class="btn-nav bg-gradient-to-r from-[#E2B077] to-[#EBB43C]" data-section="cameos">CAMEOS</button>
        <button class="btn-nav bg-gradient-to-r from-[#E2B077] to-[#813E17]" data-section="dlc">DLC</button>
        <button class="btn-nav bg-gradient-to-r from-[#F7D5AF] to-[#813E17]" data-section="arena">ARENA</button>
      </nav>
    <div>
    `;
  }

  setupEventListeners() {
    const buttons = this.querySelectorAll('.btn-nav');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const section = button.getAttribute('data-section');
        const event = new CustomEvent('navClick', {
          bubbles: true,
          composed: true,
          detail: { section }
        });
        this.dispatchEvent(event);
      });
    });
  }
}

customElements.define("app-nav", AppNav);