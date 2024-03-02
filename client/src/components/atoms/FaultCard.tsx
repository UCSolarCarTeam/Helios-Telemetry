import DangerousIcon from "@mui/icons-material/Dangerous";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export enum ISeverity {
  ERROR,
  WARNING,
}

type FaultCardProps = {
  severity: ISeverity;
  faultName: string;
};

function FaultCard(props: FaultCardProps) {
  const { severity, faultName } = props;

  return (
    <>
      <div className="flex p-2">
        <div className="flex justify-self-start"></div>
        <div
          className={`flex size-full items-center justify-start border p-2 ${
            severity === ISeverity.ERROR
              ? "border-[#9C0534]"
              : "border-[#F98D10]"
          }`}
        >
          <div className="flex h-full w-[15%] justify-start">
            {severity === ISeverity.ERROR ? (
              <DangerousIcon sx={{ color: "#9C0534", fontSize: "40px" }} />
            ) : severity === ISeverity.WARNING ? (
              <WarningAmberIcon sx={{ color: "#F98D10", fontSize: "40px" }} />
            ) : null}
          </div>
          <div className="flex w-[85%] text-2xl">{faultName}</div>
        </div>
      </div>
    </>
  );
}

export default FaultCard;
