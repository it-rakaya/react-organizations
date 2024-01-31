/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { t } from "i18next";
import React from "react";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import TermsConditionIcon from "../../atoms/icons/TermsConditionIcon";

function DeleteDoc({ setOpenModal, handleRemoveFile, files }) {
  return (
    <div className="flex flex-col items-center justify-center p-10 align-middle gap-7">
      <div>
        <TermsConditionIcon />
      </div>
      <div className="!flex flex-col items-center gap-7">
        <div className="text-center text-black dark:text-white">
          {t("Are you sure you want to delete this file?")}
        </div>
        <Grid xs={12} sm={12} md={12} xl={12}>
          <ButtonComp
            variant="contained"
            className="!mx-1  !border-solid !w-[120px] !h-[40px] !mt-0 text-black dark:text-white"
            action={() => {
              handleRemoveFile(files[0]);
              setOpenModal(false);
            }}
          >
            {t("Agree")}
          </ButtonComp>
          <ButtonComp
            className="!mx-1 !border-solid !w-[120px] !h-[40px] !mt-0  dark:!text-white"
            action={() => setOpenModal(false)}
            variant="outline"
          >
            {t("cancel")}
          </ButtonComp>
        </Grid>
      </div>
    </div>
  );
}

export default DeleteDoc;
