import { memo, useContext } from 'react';
import { List, ListSubheader } from '@mui/material';
import {
    Button,
    ListItem
} from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink } from 'react-router-dom';

import { SubMenuWrapper } from './MenuList';

function MenuItem({ data }) {
    const { name, path, children } = data;

    return (
        <List
            component="div"
            subheader={
                <ListSubheader component="div" disableSticky>
                    {name}
                </ListSubheader>
            }
        >
            <SubMenuWrapper>
                <List component="div">
                    {children?.map(function (child:any, index:number) {
                        const itemPath = '/' + path;
                        return (
                            <ChildOfItem key={index} itemPath={itemPath} data={child} />
                        );
                    })}
                </List>
            </SubMenuWrapper>
        </List>
    );
}

function ChildOfItem({ itemPath, data }) {
    const { Icon, path, name } = data;
    const { closeSidebar } = useContext(SidebarContext);

    return (
        <ListItem component="div">
            <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to={itemPath + '/' + path}
                startIcon={<Icon />}
            >
                {name}
            </Button>
        </ListItem>
    );
}

export default memo(MenuItem);