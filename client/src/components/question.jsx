import { Divider, Typography, Button, Checkbox, SvgIcon } from "@mui/material";
import { formatDateAgo } from "../utils/time";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
export const QuestionCard = ({ data }) => {
  return (
    <div className="mt-5 h-min w-1/2 ">
      <Typography variant="h5"> {data.title}</Typography>
      <Typography variant="body1">
        Asked {formatDateAgo(data.createdAt)}
      </Typography>
      <Divider className="my-2" />
      <div className="flex h-full">
        <div className="w-[10%] h-1/2 flex flex-col justify-evenly items-center">
          <ArrowDropUpIcon
            className="cursor-pointer"
            sx={{ fontSize: 50, padding: 0, margin: 0 }}
          />
          <Typography variant="h6">{data.upvotedBy.length}</Typography>
          <ArrowDropDownIcon className="cursor-pointer" sx={{ fontSize: 50 }} />
        </div>
        <div className="w-[90%] h-1/2">
          <Typography variant="body1">{data.body}</Typography>
          <div className="flex flex-wrap justify-start items-start">
            {data.tags.map((tag, ind) => {
              return (
                <p
                  className={` ${
                    ind > 0 ? "ml-2" : ""
                  } mt-3 font-sans bg-purple-100 text-purple-700 border-solid border border-purple-700 w-min px-3 py-1 rounded-3xl`}
                >
                  {tag.toUpperCase()}
                </p>
              );
            })}
          </div>
          <div className="mt-5">
            <Button variant="contained" className="bg-yellow-500">
              Edit
            </Button>
            <Button variant="contained" className="bg-red-600 ml-3">
              DELETE
            </Button>
          </div>
        </div>
      </div>
      <Divider className="my-5" />
    </div>
  );
};
