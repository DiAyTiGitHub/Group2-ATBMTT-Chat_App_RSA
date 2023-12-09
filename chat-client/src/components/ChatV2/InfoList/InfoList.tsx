import { memo } from "react";
import Toolbar from "../Toolbar/Toolbar";
import './InfoList.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { observer } from "mobx-react";

function InfoList() {
    var name = "LOREM"

    return (
        <div className="info-list">
            <Toolbar title="Info"></Toolbar>
            <img className="info-photo" src="https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg" alt=""></img>
            <div className="info-name"> {name} </div>
            <div className="info-icons">
                <IconButton>
                    <AccountCircleIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default memo(observer(InfoList));