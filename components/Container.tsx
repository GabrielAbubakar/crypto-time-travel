type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
};


const Contatiner: React.FC<Props> = ({ children }: Props) => {
    return (
        <section
            className="bg-gradient-to-tr from-slate-900 via-slate-900 to-slate-800
             text-slate-300 text-base md:text-base xl:text-lg  min-h-screen">
            {children}
        </section>
    )
}

export default Contatiner