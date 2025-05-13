import logo from '../assets/logomk.png';

class AppNav extends HTMLElement {
  constructor() {
    super();
    this.activeSection = 'home'; // Default active section
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
    <div class="flex justify-between">
      <img src="${logo}" alt="logo mortal kombat" class="h-20 w-auto pl-10 pt-6">
      <nav class="nav flex items-center">
        <button class="btn-nav bg-gradient-to-r from-[#E2B077] to-[#EBB43C] transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 ${this.activeSection === 'home' ? 'active' : ''}" data-section="home">HOME</button>
        <button class="btn-nav bg-gradient-to-r from-[#E2B077] to-[#EBB43C] transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 ${this.activeSection === 'cameos' ? 'active' : ''}" data-section="cameos">CAMEOS</button>
        <button class="btn-nav bg-gradient-to-r from-[#E2B077] to-[#813E17] transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 ${this.activeSection === 'dlc' ? 'active' : ''}" data-section="dlc">DLC</button>
        <button class="btn-nav bg-gradient-to-r from-[#F7D5AF] to-[#813E17] transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 ${this.activeSection === 'arena' ? 'active' : ''}" data-section="arena">ARENA</button>
      </nav>
    <div>
    `;

    // Add styles for active state
    const style = document.createElement('style');
    style.textContent = `
      .btn-nav {
        position: relative;
        padding: 0.5rem 1rem;
        margin: 0 0.5rem;
        border: none;
        cursor: pointer;
        font-weight: bold;
        color: #fff;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
      }
      .btn-nav::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #ff0000;
        transition: width 0.3s ease;
      }
      .btn-nav:hover::after {
        width: 100%;
      }
      .btn-nav.active::after {
        width: 100%;
      }
    `;
    this.appendChild(style);
  }

  setupEventListeners() {
    const buttons = this.querySelectorAll('.btn-nav');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const section = button.getAttribute('data-section');
        this.activeSection = section;
        
        // Update active state of all buttons
        buttons.forEach(btn => {
          btn.classList.remove('active');
          if (btn.getAttribute('data-section') === section) {
            btn.classList.add('active');
          }
        });

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