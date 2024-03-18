function Carousel() {
    return (
        <div id="default-carousel" className="relative w-full" data-carousel="slide">
            {/* <!-- Carousel wrapper --> */}
            <div className="content-start relative h-56 overflow-hidden rounded-lg md:h-96">
                {/* <!-- Item 1 --> */}
                <div className="content-start duration-700 ease-in-out absolute inset-0 transition-transform transform translate-x-0 z-30" data-carousel-item>
                    <p className="pt-72 pl-20 pb-20 relative z-10 text-5xl font-bold text-gray-200 bg-gradient-to-t from-black from-10% via-gray-950/45 via-30%">Como treinar seu dragão</p>
                    <img src="https://f.i.uol.com.br/fotografia/2019/01/11/15472373505c38f7e630710_1547237350_5x2_rt.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                </div>
                {/* <!-- Item 2 --> */}
                <div className="content-start duration-700 ease-in-out absolute inset-0 transition-transform transform translate-x-0 z-30" data-carousel-item>
                    <p className="pt-72 pl-20 pb-20 relative z-10 text-5xl font-bold text-gray-200 bg-gradient-to-t from-black from-10% via-gray-950/45 via-30%">Bob Esponja</p>
                    <img src="https://pipocamoderna.com.br/storage/2019/11/keanu-reeves-spongebob-ontherun-movie.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                </div>
                {/* <!-- Item 3 --> */}
                <div className="content-start duration-700 ease-in-out absolute inset-0 transition-transform transform translate-x-0 z-30" data-carousel-item>
                    <p className="pt-72 pl-20 pb-20 relative z-10 text-5xl font-bold text-gray-200 bg-gradient-to-t from-black from-10% via-gray-950/45 via-30%">Os Simpsons</p>
                    <img src="https://conteudo.imguol.com.br/c/entretenimento/0f/2020/04/20/os-simpsons-1587420766163_v2_1200x673.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                </div>
            </div>
            {/* <!-- Slider indicators --> */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
            </div>
            {/* <!-- Slider controls --> */}
            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200/60 group-hover:bg-gray-200/80 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Anterior</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200/60 group-hover:bg-gray-200/80 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Próximo</span>
                </span>
            </button>
        </div>
    )
}

export default Carousel
