import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

//デフォルトでローカルストレージに保存される仕組み
const { persistAtom } = recoilPersist();

//inputで受け取るデータの型定義
export type DataType = {
  id: number;
  url: string;
  time: string;
};

//データの状態を管理。初期値は空
export const dataListState = atom<DataType[]>({
  key: "dataListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
