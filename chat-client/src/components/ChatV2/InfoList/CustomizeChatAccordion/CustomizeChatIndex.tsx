import { observer } from 'mobx-react';
import React, { memo } from 'react';
import { useStore } from "src/stores";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from "@mui/material";
import InfoListModal from '../InfoListModal';
import { useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import PhotoIcon from '@mui/icons-material/Photo';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ChangeConversationNamePopup from './ChangeConversationNamePopup';
import ChangeConversationAvatarPopup from './ChangeConversationAvatarPopup';
import ChangeConversationThemePopup from './ChangeConversationThemePopup';
import ChangeConversationDescriptionPopup from './ChangeConversationDescriptionPopup';
function CustomizeChatIndex(props: any) {
    const { expanded, handleChangeStateAccordion } = props;

    const [openChangeName, setOpenChangeName] = useState(false);
    const [openChangeTheme, setOpenChangeTheme] = useState(false);
    const [openChangeAvatar, setOpenChangeAvatar] = useState(false);
    const [openChangeDescription, setOpenChangeDescription] = useState(false);

    return (
        <>
            <Accordion
                className="w-100"
                expanded={expanded === 'panel1'}
                onChange={handleChangeStateAccordion('panel1')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "0" }}
                >
                    <Typography>
                        Customzie Chat
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className="m-1 p-0">
                    <div className='list-item w-100' onClick={() => { setOpenChangeName(true) }}>
                        <BorderColorIcon className='mr-2' />
                        Change conversation name
                    </div>
                    <div className='list-item w-100' onClick={() => { setOpenChangeTheme(true) }}>
                        <TripOriginIcon className='mr-2' style={{ color: "#1A8BDF" }} />
                        Change conversation theme
                    </div>
                    <div className='list-item w-100' onClick={() => { setOpenChangeAvatar(true) }}>
                        <PhotoIcon className='mr-2' />
                        Change conversation photo
                    </div>
                    <div className='list-item w-100' onClick={() => { setOpenChangeDescription(true) }}>
                        <FormatQuoteIcon className='mr-2' />
                        Change conversation description
                    </div>
                </AccordionDetails>
            </Accordion>

            {openChangeName && (
                <ChangeConversationNamePopup
                    open={openChangeName}
                    handleClose={function () {
                        setOpenChangeName(false);
                    }}
                />
            )}

            {openChangeTheme && (
                <ChangeConversationThemePopup
                    open={openChangeTheme}
                    handleClose={function () {
                        setOpenChangeTheme(false);
                    }}
                />
            )}

            {openChangeAvatar && (
                <ChangeConversationAvatarPopup
                    open={openChangeAvatar}
                    handleClose={function () {
                        setOpenChangeAvatar(false);
                    }}
                />
            )}
            {
            openChangeDescription && (
                <ChangeConversationDescriptionPopup
                    open={openChangeDescription}
                    handleClose={() => {
                        setOpenChangeDescription(false);
                    }}
                />
            )
            }
        </>
    );
}

export default memo(observer(CustomizeChatIndex));