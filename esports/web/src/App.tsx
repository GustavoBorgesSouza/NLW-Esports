//JSX javascript + XML (HTML)
//Componentes / Propriedades(props)
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import logoIMG from './assets/logo-nlw-esports.svg';
import { GameController } from 'phosphor-react';
import './styles/main.css'
import { Input } from './components/Form/input';

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

  //Busca pelos games da API do Node.js
  function searchGames() {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setGames(data);
      })
  }

  //useEffect recebe funções e parâmetros
  useEffect(() => {
    searchGames()
  }, [])


  return (
    <div className='max-w-[1200px], mx-auto flex flex-col items-center my-16'>

      <img src={logoIMG} alt="logo do evento nlw esports" />
      <h1 className='text-6xl text-white font-black my-2'>
        Seu
        <span className='text-transparent bg-nlw-gradient bg-clip-text'> duo </span>
        está aqui
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-10'>
        {games.map(game => {
          return (
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>


            <form className='mt-8 flex flex-col gap-2'>
              <div className='flex flex-col gap-2 '>
                <label className='font-semibold' htmlFor="game">Qual o game?</label>
                <Input id='game' placeholder='Selecione o game que deseja jogar' />
              </div>

              <div className='flex flex-col gap-2' >
                <label htmlFor="name">Qual seu nome (nickname)?</label>
                <Input id='name' type="text" placeholder='Como te chamam nos games?' />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input id='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO' />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual seu discord?</label>
                  <Input id='discord' type="text" placeholder='Usuario#0000' />
                </div>
              </div>

              <div className='flex gap-6 '>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando constuma jogar?</label>

                  <div className='grid grid-cols-4 gap-2'>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Domingo'>D</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Segunda'>S</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Terça'>T</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Quarta'>Q</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Quinta'>Q</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Sexta'>S</button>
                    <button
                      className='w-8 h-8 rounded bg-zinc-900'
                      title='Sábado'>S</button>
                  </div>
                </div>

                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Qual horário do dia?</label>

                  <div className='grid grid-cols-2 gap-2'>
                    <Input id='hourStart' type="time" placeholder='De' />
                    <Input id='hourEnd' type="time" placeholder='Até' />
                  </div>

                </div>
              </div>

              <div className='mt-2 flex gap-2 text-sm '>
                <input type="checkbox" />
                Costumo me conectar ao chat de voz
              </div>

              <footer className='mt-2 flex justify-end gap-4'>
                <Dialog.Close
                  className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                  Cancelar
                </Dialog.Close>

                <button
                  className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3  hover:bg-violet-600'
                  type='submit'>
                  <GameController className='w-6 h-6' />
                  Encontrar duo
                </button>
              </footer>

            </form>
          </Dialog.Content>
        </Dialog.Portal>

      </Dialog.Root>

    </div>
  )
}
