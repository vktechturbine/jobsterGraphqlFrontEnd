import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

export const links = [
  {
    id: 1,
    text: <span className="iconsname">Stats</span>,
    path: '/',
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: <span className="iconsname">all jobs</span>,
    path: 'all-jobs',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: <span className="iconsname">add job</span>,
    path: 'add-job',
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: <span className="iconsname">profile</span>,
    path: 'profile',
    icon: <ImProfile />,
  },
  {
    id: 5,
    text: <span className="iconsname">Seeking_job</span>,
    path: 'seeking_jobs',
    icon: <img src='https://cdn-icons-png.flaticon.com/128/3850/3850285.png' style={{width:'20px',marginLeft:'2px',textAlign:'center',marginBottom:'-5px',paddingTop:'2px'}}></img>
  },
  {
    id: 6,
    text: <span className="iconsname">Jobs Applications</span>,
    path: 'jobs_Applications',
    icon: <img src='https://cdn-icons-png.flaticon.com/128/942/942799.png' style={{width:'20px',marginLeft:'2px',textAlign:'center',marginBottom:'-5px',paddingTop:'2px'}}></img>
  },
  {
    id: 7,
    text: <span className="iconsname">Applied Jobs</span>,
    path: 'appliedApplications',
    icon: <img src='https://cdn-icons-png.flaticon.com/128/7139/7139130.png' style={{width:'20px',marginLeft:'2px',textAlign:'center',marginBottom:'-5px',paddingTop:'2px'}}></img>
  },
];

