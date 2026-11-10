# NotebookLM Video Overview prompt

Paste this into NotebookLM's Video Overview "Customize" field after
adding the sources from `01-source-brief.md` and the URL list in
`02-supplemental-sources.md`.

This is an **introduction *to* the website**, not a summary of it. The
video should make the viewer want to open the project; the project
itself does the heavy lifting.

---

## Primary prompt (English, ~60 seconds)

```
Make a 60-second introductory video for a Harvard Kennedy School data-journalism project
called "The Curb — Massachusetts' unfinished bulky-waste story." The video introduces the
project itself, so viewers know what it argues and why they should open it. The project does
the deep work; the video is a doorway.

Aim for ~150 spoken words. If the first cut is over 75 seconds, shorten — don't speed up.

Structure (4 short beats):

1. Allston, today (≈15 sec). On the first weekend of September, tens of thousands of leases
   in Greater Boston turn over on the same day. Furniture piles up on curbs by the block.
   Residents call it Allston Christmas. In 2023, Boston collected about 1,700 abandoned
   mattresses in that single move-out week. This happens every year.

2. Mattresses — what regulation already accomplished (≈15 sec). In November 2022,
   Massachusetts banned mattresses from landfills under 310 CMR 19.017. By 2024 the state
   was diverting around 399,000 mattresses a year — about 66% of estimated generation.
   The curve bent almost overnight. Regulation worked.

3. Furniture — what's still missing (≈15 sec). Furniture has no equivalent. No ban, no
   statewide program, no dedicated grants. Reuse organizations exist — Habitat ReStore,
   Buy Nothing groups, university move-out drives — but they operate on weekday hours, in
   narrow windows, without coordination. Every September, the curb still wins.

4. So this project argues something has to fill that gap (≈15 sec). A coordinated municipal
   pickup, paired with a digital platform that routes outgoing tenants to reuse before items
   ever hit the curb. That is what this project lays out — seven scenes of evidence, the
   policy proposal, and a working prototype of the platform. Watch it, and decide for
   yourself.

Strict rules:

- Do NOT speak any URL. No "go to dot github dot io," no domain names. The video is a
  teaser; the viewer will get to the project some other way.
- Do NOT include a credits/team-name slide longer than 2 seconds.
- No "today we're going to talk about…" intro and no "thanks for watching" outro.
- No music that sounds like a startup explainer — keep the audio restrained, like
  a piece of editorial journalism.
- Each number gets its source named in the same beat: "MassDEP," "EPR Commission,"
  "Boston Public Works," etc. Don't bury sources to a final slide.
- Active voice. Short sentences. No hedging language ("it has been estimated that
  perhaps approximately…").

Style references: The Pudding, NYT Upshot, FT Visual Journalism. The project's own
visual language uses a desaturated red-orange for the "discard" signal and a green
for "reuse" — lean into that contrast on slides if NotebookLM controls visuals.

If something has to be cut to hit the length, drop the list of reuse partners (beat 3)
before dropping anything else. The mattress proof (beat 2) and the funnel-to-the-project
ending (beat 4) are non-negotiable.
```

---

## 日本語プロンプト (約 60 秒)

```
Harvard Kennedy School のデータジャーナリズム・プロジェクト「The Curb — マサチュー
セッツ州の片付かない粗大ごみ問題」の紹介動画を 60 秒で作ってください。動画はプロ
ジェクトそのものを紹介する入口です。視聴者がプロジェクトを開きたくなることがゴール。
深掘りはプロジェクト自身に任せ、動画はドアの役割。

語数の目安：日本語で約 180〜200 字／秒換算で 150 字前後。1 分 15 秒を超えたら速度を
上げるのではなく内容を削る。

構成（短い 4 ビート）：

1. 今のオールストン（約 15 秒）。9 月 1 日前後、ボストン圏では何万件ものリースが一斉
   に切り替わる。家具が街区ごと歩道に積み上がる。住民はこれを Allston Christmas と
   呼ぶ。2023 年の 1 週間で、ボストン市は約 1,700 床のマットレスを歩道から回収した。
   これが毎年起きている。

2. マットレス — 規制が既に成し遂げたこと（約 15 秒）。2022 年 11 月、マサチューセッツ
   州は 310 CMR 19.017 によりマットレスの埋立処分を禁止。2024 年には推定発生量の約
   66%、年間 39 万 9 千床が再資源化された。曲線はほぼ一晩で曲がった。規制は機能した。

3. 家具 — まだ足りていないもの（約 15 秒）。家具には同等の制度がない。禁止令もなく、
   州プログラムもなく、専用の助成金もない。リユースの担い手は存在する — Habitat ReStore、
   Buy Nothing、大学の引越ドライブ — だが平日業務時間に動き、ウィンドウは狭く、調整
   されていない。9 月になると、結局歩道が勝つ。

4. だからこのプロジェクトは、そこに何かが必要だと論じている（約 15 秒）。自治体の
   調整型粗大ごみ回収と、家具が歩道に出る前にリユース先へつなぐ住民向けデジタル・
   プラットフォーム。そのケースをこのプロジェクトが組み立てる — 7 幕のエビデンス、
   政策提案、そして動くプロトタイプ。ぜひ見て、自分で判断してほしい。

絶対に守ること：

- URL は一切読み上げない。「dot github dot io」も、ドメイン名も。動画はティーザー、
  プロジェクトへの導線は別経路で起きる前提。
- 2 秒を超えるクレジット／チーム名スライドは入れない。
- 「今日はこのお話を…」のような導入や、「ご視聴ありがとうございました」のような
  締めは入れない。
- 起業ピッチ系の明るい BGM は不可。エディトリアル・ジャーナリズムのトーンで抑制
  された音作り。
- 数字を語るときは出典名を同じ呼吸で（「MassDEP」「EPR Commission」「Boston Public
  Works」など）。最後にまとめて出典スライド、はやらない。
- 能動態、短文、ヘッジ表現なし。

スタイル参照：The Pudding、NYT Upshot、FT Visual Journalism。プロジェクト自身の
配色はディスカード（くすんだ赤オレンジ）／リユース（緑）の 2 色なので、スライドの
ビジュアルでもその対比を活かす。

長さに収まらない場合の削除順：(1) 第 3 ビートのリユース団体名の列挙（Habitat、
Buy Nothing 等）を最初に削る。マットレスの証明（ビート 2）と、プロジェクトへ誘導
する締め（ビート 4）は絶対に残す。
```

---

## 注意点 / Tips

- `01-source-brief.md` を最初にアップロード。これが正典。
- 出力後、**1,700 / 2022-11 / 399,000 / 66%** の 4 つの数字が崩れていないか聞き直す。
  崩れていたらブリーフ側でその数字をさらに目立たせて再生成。
- "Allston" は「ALL-stən」、"MassDEP" は "mass-dep"（一語）で読んでもらう。お使いの
  プランで pronunciation hint が使えるならプロンプトに追記。
- もし 60 秒に収まらないようなら、語数指定を 120 字／110 単語まで下げて再生成。
  NotebookLM は「短く」より「圧縮」の方が得意。
