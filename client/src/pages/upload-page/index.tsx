import { UploadFile } from "components/common";
import { Typography } from "components/common/typography";
import { RangeSlider } from "components/range-slider";
import React, { FC, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { gifService } from "services/services";
import { GifCreateRequestDto, QueryKeys } from "shared/build";
import { UploadForm, UploadFormValues } from "./form";
import { toast, Id } from "react-toastify";

export const UploadPage: FC = () => {
  const [base64, setBase64] = useState<string | undefined>();
  const [fileUrl, setFileUrl] = useState<string>("");
  const ref = useRef<HTMLVideoElement | null>(null);
  const [max, setMax] = useState(100);
  const [value, setValue] = useState({ left: 0, right: 100 });
  const navigate = useNavigate();

  const handleChange = (selectedFile: File): void => {
    const url = URL.createObjectURL(selectedFile);
    setFileUrl(url);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = (): void => {
      setBase64(reader.result?.toString());
    };
  };

  const handleChangeDuration = (): void => {
    if (!ref.current) {
      return;
    }

    if (ref.current.currentTime >= value.right) {
      ref.current.currentTime = value.left;
    }
  };

  const handleLoad = (): void => {
    if (!ref.current?.duration) {
      return;
    }
    setMax(ref.current.duration);
    setValue({ left: 0, right: ref.current.duration });
  };

  useEffect(() => {
    if (ref.current) {
      console.log("go to", value.left);
      ref.current.currentTime = value.left;
    }
  }, [value.left]);

  useEffect(() => {
    if (ref.current && ref.current.currentTime >= value.right) {
      console.log("go to", value.left);
      ref.current.currentTime = value.left;
    }
  }, [value.right, value.left]);

  const notifyUploaded = (): Id => toast("Gif successfuly uploaded", { type: "success" });
  const { isLoading: isCreating, mutateAsync: createGifAsync } = useMutation(
    [QueryKeys.GIF, QueryKeys.USER],
    (payload: Omit<GifCreateRequestDto, "authorId">) => gifService.create(payload),
    {
      onSuccess: (data) => {
        if (data) {
          const { id } = data;
          navigate(`/gif/${id}`);
          notifyUploaded();
        }
      },
    },
  );

  const { mutateAsync: uploadAsync, isLoading: isUploading } = useMutation(
    [QueryKeys.GIF, QueryKeys.USER],
    (data: { base64: string; crop: { left: number; right: number } }) => gifService.upload(data),
  );

  const handleClickUpload = async ({ title }: UploadFormValues): Promise<void> => {
    if (base64) {
      const { res } = await uploadAsync({
        base64,
        crop: value,
      });
      await createGifAsync({
        mediaSrc: res,
        title,
      });
    }
  };

  if (isUploading) {
    return <Typography text="Uploading..." />;
  }

  if (isCreating) {
    return <Typography text="Creating..." />;
  }

  return (
    <div className="flex flex-col space-y-6 justify-between">
      <div className="flex flex-col space-y-4 h-1/3">
        <UploadFile title="Upload Video (up to 1mb)" eventCb={handleChange} />
        <div className="flex flex-row justify-between space-x-4">
          <video
            className="h-auto w-7/12"
            onDurationChange={handleLoad}
            onTimeUpdate={handleChangeDuration}
            ref={ref}
            muted
            autoPlay
            loop
            src={fileUrl}
          />
          {ref.current && (
            <div className="w-5/12">
              <UploadForm cropValue={value} onSubmit={handleClickUpload} isLoading={false} />
            </div>
          )}
        </div>
        {ref.current && (
          <div className="w-7/12">
            <RangeSlider
              setValue={setValue}
              initialMin={value.left}
              initialMax={value.right}
              min={0}
              max={max}
              step={1}
            />
          </div>
        )}
      </div>
    </div>
  );
};
