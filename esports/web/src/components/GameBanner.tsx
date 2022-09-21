import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' // import from 'keen-slider/react.es' for to get an ES module


interface GameBannerProps{
    bannerUrl: string;
    title: string;
    adsCount: number;
}

export function GameBanner(props: GameBannerProps){
    return(
        <div className='relative rounded-lg overflow-hidden keen-slider__slide'>
          <img className='w-full h-full' src={props.bannerUrl} alt="imagem do game" />
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>{props.title}</strong>
            <span className='text-zinc-300 text-sm block'>{props.adsCount} anúncio(s)</span>
          </div>
        </div>
    )
}