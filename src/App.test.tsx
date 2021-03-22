//import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);

    screen.debug();

    //文字列(完全一致)が存在しているか。
    //正規表現(部分一致)も使用可能
    //getBy => 存在しない要素のアサーションを行おうとすると、エラーをスローする。
    //toBeInTheDocument => アサーション関数
    expect(screen.getByText("Search:")).toBeInTheDocument();

    //queryBy => 存在しない要素のアサーションを行う場合
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    //findBy => まだ存在しないものの最終的に存在する要素のアサーションを行う場合
    //非同期要素

    //DOMの属性
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("fireEvent", () => {
    render(<App />);

    screen.debug();

    //存在しないことを確認して
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    //イベントの発火をシミュレート
    //fireEvent.change(要素, イベント)
    //userEventの方が推奨される
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });
    //存在を確認
    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();

    screen.debug();
  });

  test("userEvent", async () => {
    render(<App />);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    //userEvent.type(要素, イベント)
    //fireEventよりも実際のブラウザに近い振る舞い
    //changeだけでなく、keyDown、keyPress、keyUpイベントの発火
    await userEvent.type(screen.getByRole("textbox"), "JavaScript");

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});
