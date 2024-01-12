import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HistoryCollectionTable from "./HistoryCollectionTable";

export default function OwnerDonated() {
  return (
    <div className="flex justify-center shrink-0 w-[900px]">
      <div className="w-fit">
        <Typography
          sx={{
            color: "var(--Inactive-State-Color, rgba(73, 69, 79, 0.80))",
            fontSize: "19.556px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
            marginBottom: "17px",
          }}
        >
          Donate History
        </Typography>
        <div className="mb-[30px] space-x-3">
          {["All", "Own", "Guest"].map((button) => (
            <Button
              sx={{
                textTransform: "none",
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "26.667px",
                border: "1px solid #EBEBEE",
                background: "white",
                justifyContent: "center",
                alignContent: "center",
                width: "113.778px",
                height: "40.89px",
              }}
              key={button}
            >
              <Typography
                sx={{
                  color: "black",
                  fontVariantNumeric: "lining-nums propertional-nums",
                  fontFeatureSettings: `'dlig' on`,
                  fontSize: "15.111px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                  letterSpacing: "0.151px",
                }}
              >
                {button}
              </Typography>
            </Button>
          ))}
        </div>
        <HistoryCollectionTable />
      </div>
    </div>
  );
}
