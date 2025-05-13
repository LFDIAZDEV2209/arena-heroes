export class AppNav extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="nav">
        <button class="btn-nav bg-gradient-to-r from-[#E2B077] to-[#EBB43C]">HOME</button>
        <button class="btn-nav bg-gradient-to-r from-[#E2B077] to-[#EBB43C]">CAMEOS</button>
        <button class="btn-nav bg-gradient-to-r from-[#E2B077] to-[#813E17]">DLC</button>
        <button class="btn-nav bg-gradient-to-r from-[#F7D5AF] to-[#813E17]">ARENA</button>
      </nav>
    `;
  }
}
customElements.define("app-nav", AppNav);