const SectionTitle = ({ title }) => {
  return (
    <div className="border-b border-base-300 pb-6">
      <h2 className="text-3xl font-medium tracking-wider capitalize text-center md:text-left">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
