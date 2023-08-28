import { useAppDispatch } from "@js-camp/react/store";
import { typedMemo } from "@js-camp/react/utils/typedMemo";
import { Container } from "@mui/material";
import { FC } from "react";

const MainPaigComponent: FC = () => {
	const dispatch = useAppDispatch();

	return <Container></Container>
}

export const MainPage = typedMemo(MainPaigComponent);
