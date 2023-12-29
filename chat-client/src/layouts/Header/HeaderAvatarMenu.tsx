import { ClickAwayListener, Grow, Menu, MenuItem, MenuList, Modal, Paper, Popper, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React, { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutPopup from "./LogoutPopup";

function HeaderAvatarMenu(props: any) {
    const { handleClose, open, anchorRef } = props;

    const [openLogoutPopup, setOpenLogoutPopup] = useState(false);

    return (
        <>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                className="max-z-index"
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                >
                                    <MenuItem onClick={handleClose}>
                                        <NavLink to={'account'} className="p-0 px-4 flex" style={{ textDecoration: "none", color: "black" }}>
                                            <Typography textAlign="center" fontWeight='500'>ACCOUNT</Typography>
                                        </NavLink>
                                    </MenuItem>
                                    {/* <MenuItem onClick={handleClose}>
                                        <NavLink to={'/'} className="p-0 px-4 flex" style={{ textDecoration: "none", color: "black" }}>
                                            <Typography textAlign="center" fontWeight='500'>LOGOUT</Typography>
                                        </NavLink>
                                    </MenuItem> */}
                                    <MenuItem >
                                        <div className="p-0 px-4 flex" onClick={function () {
                                            setOpenLogoutPopup(true);
                                        }}>
                                            <Typography textAlign="center" fontWeight='500'>LOGOUT</Typography>
                                        </div>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

            {openLogoutPopup && (
                <LogoutPopup
                    open={openLogoutPopup}
                    handleClose={function () {
                        setOpenLogoutPopup(false);
                    }}
                />
            )}
        </>
    );
}

export default memo(observer(HeaderAvatarMenu));