import React from "react";
import {
	Timeline,
	TimelineItem,
	TimelineConnector,
	TimelineHeader,
	TimelineIcon,
	TimelineBody,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
} from "@material-tailwind/react";
import { HomeIcon, BellIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

const TrackDocumentContent = ({ open, onClose }) => {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
			<DialogTitle>Timeline</DialogTitle>
			<DialogContent>
				<Timeline>
					<TimelineItem>
						<TimelineConnector />
						<TimelineHeader>
							<TimelineIcon className="p-2">
								<HomeIcon className="h-4 w-4" />
							</TimelineIcon>
							<Typography variant="h5" color="blue-gray">
								Timeline Title Here.
							</Typography>
						</TimelineHeader>
						<TimelineBody className="pb-8">
							<Typography color="gray" className="font-normal text-gray-600">
								The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I'm never giving up, I'm just getting started. I'm up to something. Fan luv.
							</Typography>
						</TimelineBody>
					</TimelineItem>
					<TimelineItem>
						<TimelineConnector />
						<TimelineHeader>
							<TimelineIcon className="p-2">
								<BellIcon className="h-4 w-4" />
							</TimelineIcon>
							<Typography variant="h5" color="blue-gray">
								Timeline Title Here.
							</Typography>
						</TimelineHeader>
						<TimelineBody className="pb-8">
							<Typography color="gray" className="font-normal text-gray-600">
								The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I'm never giving up, I'm just getting started. I'm up to something. Fan luv.
							</Typography>
						</TimelineBody>
					</TimelineItem>
					<TimelineItem>
						<TimelineHeader>
							<TimelineIcon className="p-2">
								<CurrencyDollarIcon className="h-4 w-4" />
							</TimelineIcon>
							<Typography variant="h5" color="blue-gray">
								Timeline Title Here.
							</Typography>
						</TimelineHeader>
						<TimelineBody>
							<Typography color="gray" className="font-normal text-gray-600">
								The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I'm never giving up, I'm just getting started. I'm up to something. Fan luv.
							</Typography>
						</TimelineBody>
					</TimelineItem>
				</Timeline>
			</DialogContent>
		</Dialog>
	);
};

export default TrackDocumentContent;
