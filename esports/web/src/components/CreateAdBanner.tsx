import {MagnifyingGlassPlus} from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'


export function CreateAdBanner() {
    return (
        <div className='pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden'>
            <div className='bg-[#2A2634] px-6 py-4 flex justify-between items-center'>
                <div>
                    <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
                    <span className='text-base text-zinc-400 block'>Publique um anúncio para encontrar novos players!</span>
                </div>

                <Dialog.Trigger className='py-2 px-3 bg-violet-500 text-white rounded-md hover:bg-violet-700 flex items-center gap-1 text-lg'>
                    <MagnifyingGlassPlus size={20} />
                    Publicar anúncio
                </Dialog.Trigger>
            </div>
        </div>
    )
}