import { observer } from 'mobx-react';
import React, { memo } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { useStore } from "src/stores";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from "@mui/material";
import ItemParticipant from './ItemParticipant';

function ParticipantIndex(props: any) {
    const { expanded, handleChangeStateAccordion } = props;

    const { chatStore } = useStore();

    const { chosenRoom } = chatStore;

    return (
        <Accordion
            className="w-100"
            expanded={expanded === 'panel2'}
            onChange={handleChangeStateAccordion('panel2')}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Participants</Typography>
            </AccordionSummary>
            <AccordionDetails className="m-0 p-0">
                {
                    chosenRoom && chosenRoom?.participants && chosenRoom.participants.length > 0
                    && chosenRoom.participants.map(function (participant: any, index: number) {
                        return (
                            <ItemParticipant participant={participant} key={index} />
                        );
                    }
                    )
                }
            </AccordionDetails>
        </Accordion>
    );
}

export default memo(observer(ParticipantIndex));