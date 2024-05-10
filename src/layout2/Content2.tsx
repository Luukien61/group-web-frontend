const Content2 = () => {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
  return (
    <main className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
      <div className="flex w-full">
        <div className="flex-auto max-w-4xl min-w-0 pt-6 lg:px-8 lg:pt-6 pb:12 xl:pb-24 lg:pb-16">
            {numbers.map(()=>{
                return (
                    <p className="font-semibold">This is a line</p>
                )
            })}
        </div>
      </div>
    </main>
  );
};

export default Content2;
