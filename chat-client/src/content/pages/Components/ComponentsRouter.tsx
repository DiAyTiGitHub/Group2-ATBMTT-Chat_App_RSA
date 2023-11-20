import SidebarLayout from "src/layouts/SidebarLayout/SidebarLayoutIndex";
import AccordionRouter from "src/content/pages/Components/Accordions/AccordionsRouter";
import AvatarsRouter from "src/content/pages/Components/Avatars/AvatarsRouter";
import BadgesRouter from "src/content/pages/Components/Badges/BadgesRouter";
import ButtonsRouter from "src/content/pages/Components/Buttons/ButtonsRouter";
import CardsRouter from "src/content/pages/Components/Cards/CardsRouter";
import FormsRouter from "src/content/pages/Components/Forms/FormsRouter";
import ModalsRouter from "src/content/pages/Components/Modals/ModalsRouter";
import TabsRouter from "src/content/pages/Components/Tabs/TabsRouter";
import TooltipsRouter from "src/content/pages/Components/Tooltips/TooltipsRouter";

const ComponentsRouters = [
    {
        path: "components",
        element: <SidebarLayout />,
        children: [
            ...AccordionRouter,
            ...AvatarsRouter,
            ...BadgesRouter,
            ...ButtonsRouter,
            ...CardsRouter,
            ...FormsRouter,
            ...ModalsRouter,
            ...TabsRouter,
            ...TooltipsRouter
        ]
    },
];

export default ComponentsRouters;