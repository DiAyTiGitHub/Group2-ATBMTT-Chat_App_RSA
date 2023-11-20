import Status404Router from "./Status404/Status404Router";
import Status500Router from "./Status500/Status500Router";
import ComingSoonRouter from "./ComingSoon/ComingSoonRouter";
import MaintenanceRouter from "./Maintenance/MaintenanceRouter";

const StatusRouter = [
    {
        path: "status",
        children: [
            ...Status404Router,
            ...Status500Router,
            ...ComingSoonRouter,
            ...MaintenanceRouter
        ]
    },
];

export default StatusRouter;