import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
import HowToVoteTwoToneIcon from '@mui/icons-material/HowToVoteTwoTone';
import LocalPharmacyTwoToneIcon from '@mui/icons-material/LocalPharmacyTwoTone';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import ChromeReaderModeTwoToneIcon from '@mui/icons-material/ChromeReaderModeTwoTone';
import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
import CameraFrontTwoToneIcon from '@mui/icons-material/CameraFrontTwoTone';
import PublicIcon from '@mui/icons-material/Public';
import Diversity2Icon from '@mui/icons-material/Diversity2';

const navigations = [
    {
        name: 'Dashboards',
        path: 'dashboards',
        children: [
            {
                name: 'Cryptocurrency',
                path: 'crypto',
                Icon: BrightnessLowTwoToneIcon,
            },
            {
                name: 'Messenger',
                path: 'messenger',
                Icon: MmsTwoToneIcon,
            },
        ],
    },
    {
        name: 'Management',
        path: 'management',
        children: [
            {
                name: 'Transactions List',
                path: 'transactions',
                Icon: TableChartTwoToneIcon,
            },
            {
                name: 'Country',
                path: 'country',
                Icon: PublicIcon,
            },
            {
                name: 'Ethnics',
                path: 'ethnics',
                Icon: Diversity2Icon,
            },
        ],
    },
    {
        name: 'Accounts',
        path: 'management/profile',
        children: [
            {
                name: 'User Profile',
                path: 'details',
                Icon: AccountCircleTwoToneIcon,
            },
            {
                name: 'Account Settings',
                path: 'settings',
                Icon: DisplaySettingsTwoToneIcon,
            },
        ],
    },
    {
        name: 'Components',
        path: 'components',
        children: [
            {
                name: 'Buttons',
                path: 'buttons',
                Icon: BallotTwoToneIcon,
            },
            {
                name: 'Modals',
                path: 'modals',
                Icon: BeachAccessTwoToneIcon,
            },
            {
                name: 'Accordions',
                path: 'accordions',
                Icon: EmojiEventsTwoToneIcon,
            },
            {
                name: 'Tabs',
                path: 'tabs',
                Icon: FilterVintageTwoToneIcon,
            },
            {
                name: 'Badges',
                path: 'badges',
                Icon: HowToVoteTwoToneIcon,
            },
            {
                name: 'Tooltips',
                path: 'tooltips',
                Icon: LocalPharmacyTwoToneIcon,
            },
            {
                name: 'Avatars',
                path: 'avatars',
                Icon: RedeemTwoToneIcon,
            },
            {
                name: 'Cards',
                path: 'cards',
                Icon: SettingsTwoToneIcon,
            },
            {
                name: 'Forms',
                path: 'forms',
                Icon: TrafficTwoToneIcon,
            },
        ],
    },
    {
        name: 'Extra Pages',
        path: 'status',
        children: [
            {
                name: 'Error 404',
                path: '404',
                Icon: CheckBoxTwoToneIcon,
            },
            {
                name: 'Error 500',
                path: '500',
                Icon: CameraFrontTwoToneIcon,
            },
            {
                name: 'Coming Soon',
                path: 'coming-soon',
                Icon: ChromeReaderModeTwoToneIcon,
            },
            {
                name: 'Maintenance',
                path: 'maintenance',
                Icon: WorkspacePremiumTwoToneIcon,
            },
        ],
    },
];


export default navigations;
