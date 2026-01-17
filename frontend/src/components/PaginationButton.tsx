'use client'
import {Dispatch, SetStateAction} from 'react';
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io'

export default function PaginationButton({
page,
setPage,
totalPages
}: {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    totalPages: number;
}) {

    const getPageNumbers = () => {
        const pages: (number|string)[] =[];

        if(totalPages<=5){
            for(let i = 1; i <= totalPages;i++){
                pages.push(i)
            }
        }else {
            if(page <=3){
                pages.push(1,2,3,4,'...',totalPages)
            }else if(page >= totalPages -2){
                pages.push(1,'...',totalPages-3,totalPages-2,totalPages-1,totalPages)
            }else{
                pages.push(1,'...',page-1,page,page+1,'...',totalPages)
            }
        }
        return pages
    }

    return(
        <main className="p-30 flex gap-5 flex-col justify-center items-center w-full scale-70 md:scale-100">
            <div className="flex gap-6">
                <button
                    onClick={() => setPage(prev => Math.max(1,prev-1))}
                    disabled={page===1}
                    className="h-10 w-10 flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none hover:cursor-pointer rounded-full hover:bg-black/10"
                >
                    <IoIosArrowBack/>
                </button>
                {
                    getPageNumbers().map((p,i)=>(
                        <button
                            key={i}
                            onClick={()=>typeof p === 'number' && setPage(p)}
                            disabled={p==='...' || p === page}
                            className={`
                                p-2 h-10 w-10 rounded-full font-semibold
                                ${p === page ? 'bg-black text-white' : 'text-black bg-transparent'}
                                ${(p === '...' || p === page) ? 'cursor-default' : 'hover:bg-black/40 cursor-pointer'}
                            `}
                        
                        >
                            {p}
                        </button>
                    ))
                }
                <button
                    onClick={() => setPage(prev => Math.min(totalPages,prev+1))}
                    disabled={page===totalPages}
                    className="h-10 w-10 flex items-center justify-center disabled:opacity-20 disabled:pointer-events-none hover:cursor-pointer rounded-full hover:bg-black/10"
                >
                    <IoIosArrowForward/>
                </button>
            </div>
        </main>
    )
}