import IconArrowRight from '../assets/js/IconArrowRight'
import IconMenuLine from '../assets/js/IconMenuLine';

const Navbar = ({visible}) => {
  return <div className={`flex justify-between items-center px-6 bg-white transition-transform duration-300 ease-in-out transform fixed top-0 h-20 lg:min-w-[96vw] md:min-w-[94vw] min-w-[90vw] m-5 z-50 ${visible ? 'translate-y-0' : '-translate-y-32'}`}>
  <ul className=' gap-4 lg:flex md:flex hidden    '>
    <li>
    <a className='' href='#'>
      About
      </a>
    </li>
    <li>
    <a className='' href='#'>
      News
      </a>
    </li>
    <li>
    <a className='' href='#'>
      Services
      </a>
    </li>
    <li>
    <a className='' href='#'>
      Our Team
      </a>
    </li>
    <li>
    <a className='' href='#'>
      Make Enquiry
      </a>
    </li>
  </ul>
  <button className='flex items-center gap-4 p-2 bg-white  rounded-none border-2 border-black'>Contact Us <IconArrowRight className="h-6 w-6"/></button>
  <button className='flex items-center gap-4 p-2 bg-stone-300 lg:hidden md:hidden'><IconMenuLine className="h-6 w-6"/></button>
</div>;
};

export default Navbar;
