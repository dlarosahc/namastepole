const navbar = document.querySelector('#navbar');

const createNavHome = () => {
    navbar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center text-white px-4 justify-between">
            <p class=" font-bold text-xl ">Namaste Pole Fitness</p>
           
            <!-- Version Movil -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 md:hidden cursor-pointer p-2 hover:bg-purple-700 rounded-lg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <!-- Version de Escritorio -->
            <div class="hidden md:flex flex-row gap-3 items-center">
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/">Home</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/aboutus/">Nosotros</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/prices/">Paquetes y Precios</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/login/">Iniciar Sesión</a>
             <a class="transition ease-in-out font-bold bg-purple-700 inline-block  px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" href="/signup/">Registro</a>
            </div>

            <!-- Menu Mobile -->
            <div class="text-white bg-slate-900/50 fixed top-16 right-0 left-0 bottom-0 hidden justify-center items-center flex-col gap-2  ">
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/">Home</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/aboutus/">Nosotros</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/prices/">Paquetes y Precios</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/login/">Iniciar Sesión</a>
             <a class="transition ease-in-out font-bold bg-purple-700 inline-block  px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" href="/signup/">Registro</a>
            </div>
        </div>
    `;
};

const createNavSignup = () => {
    navbar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center text-white px-4 justify-between">
            <p class=" font-bold text-xl ">Namaste Pole Fitness</p>
           
            <!-- Version Movil -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 md:hidden cursor-pointer p-2 hover:bg-purple-700 rounded-lg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <!-- Version de Escritorio -->
            <div class="hidden md:flex flex-row gap-3 items-center">
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/">Home</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/login/">Nosotros</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/login/">Paquetes y Precios</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/login/">Iniciar Sesión</a>
            </div>

            
            <div class="text-white bg-slate-900/50 fixed top-16 right-0 left-0 bottom-0 hidden justify-center items-center flex-col gap-2  ">
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/">Home</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/login/">Nosotros</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/login/">Paquetes y Precios</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/login/">Iniciar Sesión</a>
            </div>
        </div>
    `;
};

const createNavLogin = () => {
    navbar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center text-white px-4 justify-between">
            <p class=" font-bold text-xl ">Namaste Pole Fitness</p>
           
            <!-- Version Movil -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 md:hidden cursor-pointer p-2 hover:bg-purple-700 rounded-lg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <!-- Version de Escritorio -->
            <div class="hidden md:flex flex-row gap-3 items-center">
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/">Home</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/aboutus/">Nosotros</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/login/">Paquetes y Precios</a>
             <a class="transition ease-in-out font-bold bg-purple-700 inline-block  px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-white  hover:text-violet-400 mt-4 lg:mt-0" href="/signup/">Registro</a>
            </div>

            
            <div class="text-white bg-slate-900/50 fixed top-16 right-0 left-0 bottom-0 hidden justify-center items-center flex-col gap-2">
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/">Home</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/aboutus/">Nosotros</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/login/">Paquetes y Precios</a>
             <a class="transition ease-in-out font-bold bg-purple-700 inline-block  px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" href="/signup/">Registro</a>
            </div>
        </div>
    `;
};

const createNavUs = () => {
    navbar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center text-white px-4 justify-between">
            <p class=" font-bold text-xl ">Namaste Pole Fitness</p>
           
            <!-- Version Movil -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 md:hidden cursor-pointer p-2 hover:bg-purple-700 rounded-lg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <!-- Version de Escritorio -->
            <div class="hidden md:flex flex-row gap-3 items-center">
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/">Home</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/aboutus/">Nosotros</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/prices/">Paquetes y Precios</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/login/">Iniciar Sesión</a>
             <a class="transition ease-in-out font-bold bg-purple-700 inline-block  px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" href="/signup/">Registro</a>
            </div>

            <!-- Menu Mobile -->
            <div class="text-white bg-slate-900/50 fixed top-16 right-0 left-0 bottom-0 hidden justify-center items-center flex-col gap-2  ">
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/">Home</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/aboutus/">Nosotros</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/prices/">Paquetes y Precios</a>
             <a class="transition ease-in-out font-bold block mt-4 lg:inline-block lg:mt-0  hover:bg-white px-4 py-2 hover:text-violet-400 rounded-lg" href="/login/">Iniciar Sesión</a>
             <a class="transition ease-in-out font-bold bg-purple-700 inline-block  px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" href="/signup/">Registro</a>
            </div>
        </div>
    `;
};



if(window.location.pathname === '/'){
    createNavHome();
} else if (window.location.pathname === '/signup/'){
    createNavSignup();
} else if (window.location.pathname === '/login/'){
    createNavLogin();
} else if (window.location.pathname === '/aboutus/'){
    createNavUs();
} 

const navBtn = navbar.children[0].children[1];

navBtn.addEventListener('click', e => {
    const menuMobile =  navbar.children[0].children[3];
    if(!navBtn.classList.contains('active')){
        navBtn.classList.add('active');
        navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />'
        menuMobile.classList.remove('hidden');
        menuMobile.classList.add('flex');

    } else{
        navBtn.classList.remove('active');
    navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />';
    menuMobile.classList.add('hidden');
    menuMobile.classList.remove('flex');
}
});


