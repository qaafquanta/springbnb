const Footer = () => {
  return (
    <div className="border-t-[1px] bg-gray-100 mt-auto">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © 2025 Springbnb, Inc. · Privacy · Terms · Sitemap
          </div>
          <div className="flex flex-row gap-4 text-sm font-semibold text-gray-500">
            <div className="cursor-pointer hover:underline">English (US)</div>
            <div className="cursor-pointer hover:underline">Rp IDR</div>
            <div className="cursor-pointer hover:underline">Support & Resources</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
