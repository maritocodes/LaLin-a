interface HighlightInterface {
  day: number,
  month: number,
  title: string,
} 

const Highlight = (props: HighlightInterface) => {
  return(
    <section id="highlight" className="h-screen flex flex-col justify-between pl-24 py-12 text-accent bg-blue-100">
        {/** DATE */}
        <p className="text-9xl">{String(props.day).padStart(2, '0')}/ <br /> {String(props.month).padStart(2, '0')} </p>
        <div className="flex flex-col items-start">
            <img className="w-auto h-12" src="/podcast.svg" alt="PODCAST" />
            <h4 className="text-8xl w-1/2"> {props.title} </h4>
        </div>
    </section>
  );
};
export default Highlight;