//JSX javascript + XML (HTML)
//Componentes / Propriedades(props)
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import logoIMG from './assets/logo-nlw-esports.svg';
import { GameController } from 'phosphor-react';
import './styles/main.css'
import { Input } from './components/Form/input';
import CreateAdModal from './components/CreateAdModal';
import axios from 'axios';

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react' // import from 'keen-slider/react.es' for to get an ES module


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export default function App() {
  //o <> é do typescript e permite fazer declarações, ex: o array que seria generico será de Game, seguindo a interface
  const [games, setGames] = useState<Game[]>([]);

  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 6.5,
      spacing: 20,
    },
    renderMode: 'precision'
  })

  //Busca pelos games da API do Node.js
  function searchGames() {
    axios('http://localhost:3333/games')
      .then(response => {
        // console.log(data);
        setGames(response.data);
      })
  }

  //useEffect recebe funções e parâmetros
  useEffect(() => {
    searchGames()
  }, [])


  return (
    <div className='max-w-[1200px] mx-auto flex flex-col items-center my-8'>

      <img className='w-52 h-auto' src={logoIMG} alt="logo do evento nlw esports" />
      <h1 className='text-4xl text-white font-black my-3'>
        Seu
        <span className='text-transparent bg-nlw-gradient bg-clip-text'> duo </span>
        está aqui
      </h1>

      <div ref={ref} className='keen-slider mx-10 mt-6'>
        {games.map(game => {
          return (
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>

    </div>
  )
}
