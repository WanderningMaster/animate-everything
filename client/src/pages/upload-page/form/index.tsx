import { FC, useEffect } from "react";
import { Button, Input } from "components/components";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { uploadGif } from "shared/build/validation-schemas/validation-schemas"; //FIXME

export interface UploadFormValues {
  title: string;
}

type Props = {
  isLoading: boolean;
  onSubmit: (formValue: UploadFormValues) => void;
  cropValue: { left: number; right: number };
};

export const UploadForm: FC<Props> = ({ isLoading, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<UploadFormValues>({
    defaultValues: { title: "" },
    resolver: joiResolver(uploadGif),
    mode: "onChange",
  });

  useEffect(() => {
    console.log(isValid);
  }, [isValid]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col justify-center w-full"}>
        <Input control={control} name={"title"} label="Title" placeholder="Title" type="text" />
        <Button type={"submit"} title={"Continue Upload"} disabled={!isValid || isLoading} />
      </form>
    </>
  );
};
