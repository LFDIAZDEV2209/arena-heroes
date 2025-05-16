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
    <button id="sidebarToggle" class=" fixed top-5 left-3 z-[100] p-1 rounded bg-black/80 text-white focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-7 h-7">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <div id="sidebar" class="hidden flex-row sm:flex-col fixed sm:fixed left-0 top-0 w-50 sm:w-40 h-full sm:h-screen bg-black/80 z-50 shadow-lg transition-transform duration-300 -translate-x-full sm:translate-x-0">
      <div class="flex items-center justify-center sm:justify-center w-full h-16 sm:h-32 p-2 sm:pt-8">
        <img src="${logo}" alt="logo mortal kombat" class="h-10 sm:h-15 w-auto ">
      </div>
      <nav class="nav flex flex-1 flex-col items-center justify-center sm:justify-auto w-auto sm:w-auto gap-2 sm:gap-2 px-2 sm:px-2 py-2 sm:py-4">
        <button class="btn-nav bg-gradient-to-r from-[#E2B077] to-[#EBB43C] transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 ${this.activeSection === 'home' ? 'active' : ''}" data-section="home">HOME</button>
        <button class="btn-nav bg-gradient-to-r from-[#E2B077] to-[#EBB43C] transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 ${this.activeSection === 'cameos' ? 'active' : ''}" data-section="cameos">CAMEOS</button>
        <button class="btn-nav bg-gradient-to-r from-[#E2B077] to-[#813E17] transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 ${this.activeSection === 'dlc' ? 'active' : ''}" data-section="dlc">DLC</button>
        <button class="btn-nav bg-gradient-to-r from-[#F7D5AF] to-[#813E17] transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 ${this.activeSection === 'arena' ? 'active' : ''}" data-section="arena">ARENA</button>
      </nav>
    </div>
    <div id="sidebarOverlay" class="fixed inset-0 bg-black/40 z-40 hidden sm:hidden"></div>
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

    // Sidebar toggle logic
    setTimeout(() => {
      const sidebar = this.querySelector('#sidebar');
      const overlay = this.querySelector('#sidebarOverlay');
      const toggle = this.querySelector('#sidebarToggle');
      if (toggle && sidebar && overlay) {
        toggle.addEventListener('click', () => {
          sidebar.classList.remove('hidden');
          sidebar.classList.remove('-translate-x-full');
          overlay.classList.remove('hidden');
        });
        overlay.addEventListener('click', () => {
          sidebar.classList.add('-translate-x-full');
          overlay.classList.add('hidden');
          setTimeout(() => sidebar.classList.add('hidden'), 300);
        });
        sidebar.querySelectorAll('button').forEach(btn => {
          btn.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
            setTimeout(() => sidebar.classList.add('hidden'), 300);
          });
        });
      }
    }, 0);
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