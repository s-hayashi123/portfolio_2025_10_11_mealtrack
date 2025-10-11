import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* ヒーローセクション */}
      <section className="container mx-auto mt-12 px-4 flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 leading-tight text-center md:text-left">
            食事管理と体重記録で、 <br className="hidden md:inline" />{" "}
            健康な毎日をサポート！
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 text-center md:text-left">
            MealTrack（ミールトラック）は、シンプルな食事管理と体重記録ができる無料アプリ。
            <br />
            健康習慣を見える化して、あなたのダイエット・ボディメイク・健康維持を応援します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/signup"
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded font-bold shadow transition"
            >
              今すぐ始める（無料）
            </a>
            <a
              href="/mypage"
              className="border border-green-600 text-green-700 hover:bg-green-50 px-8 py-3 rounded font-bold text-lg transition"
            >
              マイページを見る
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=420&q=80"
            alt="食事管理をサポートするイメージ"
            className="rounded-lg shadow-lg w-[350px] md:w-[420px] object-cover"
            width={420}
            height={320}
            loading="lazy"
            style={{ width: "80%", height: "auto" }}
          />
        </div>
      </section>

      {/* ダッシュボードイメージセクション */}
      <section className="container mx-auto mt-20 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
          直感的で使いやすいダッシュボード
        </h2>
        <p className="text-gray-700 text-center mb-8">
          食事内容と体重の履歴を一目で確認。グラフで変化を見ながら、日々の習慣をチェックできます。
        </p>
        <div className="flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
            alt="ダッシュボード画面イメージ（ロイヤリティーフリー画像/Unsplash）"
            className="rounded-xl shadow-lg w-full md:w-2/3 lg:w-1/2 object-cover"
            width={600}
            height={350}
            loading="lazy"
            style={{ width: "80%", height: "auto" }}
          />
        </div>
      </section>

      {/* 料金体系セクション */}
      <section className="container mx-auto mt-20 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
          料金体系
        </h2>
        <div className="flex flex-col md:flex-row md:justify-center gap-8 mb-4">
          <div className="flex-1 bg-white border rounded-xl shadow p-6 text-center">
            <h3 className="font-bold text-xl text-green-600 mb-2">
              無料プラン
            </h3>
            <p className="mb-4 text-gray-700">
              すべての基本機能がずっと無料で使えます。
            </p>
            <ul className="text-gray-600 mb-6 space-y-2 text-left inline-block">
              <li>✓ 食事と体重の記録</li>
              <li>✓ 日次/週次のグラフ表示</li>
              <li>✓ 目標体重の設定＆達成管理</li>
            </ul>
            <div className="text-3xl font-bold text-gray-900 mb-2">¥0</div>
            <span className="text-gray-500">ずっと無料</span>
          </div>
          <div className="flex-1 bg-gray-50 border border-green-200 rounded-xl shadow p-6 text-center opacity-60 pointer-events-none">
            <h3 className="font-bold text-xl text-green-700 mb-2">
              プレミアム（準備中）
            </h3>
            <p className="mb-4 text-gray-700">
              もっと便利に使いたい方へ。今後リリース予定です。
            </p>
            <ul className="text-gray-600 mb-6 space-y-2 text-left inline-block">
              <li>✓ CSVエクスポート</li>
              <li>✓ アドバンスレポート</li>
              <li>✓ サポート優先対応</li>
            </ul>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              Coming Soon
            </div>
          </div>
        </div>
      </section>

      {/* ユーザーの声セクション */}
      <section className="container mx-auto mt-20 px-4 mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          ユーザーの声
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-white border rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="ユーザー1"
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
                loading="lazy"
                style={{ width: "40px", height: "40px" }}
              />
              <div>
                <div className="font-bold text-gray-900 text-sm">
                  ゆうこさん
                </div>
                <div className="text-gray-500 text-xs">30代 / 会社員</div>
              </div>
            </div>
            <p className="text-gray-700">
              シンプルで見やすく、毎日の体重管理が続いています。グラフで成果が見えるとやる気が出ます！
            </p>
          </div>
          <div className="bg-white border rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="https://randomuser.me/api/portraits/men/31.jpg"
                alt="ユーザー2"
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
                loading="lazy"
                style={{ width: "40px", height: "40px" }}
              />
              <div>
                <div className="font-bold text-gray-900 text-sm">
                  だいきさん
                </div>
                <div className="text-gray-500 text-xs">20代 / 学生</div>
              </div>
            </div>
            <p className="text-gray-700">
              無料でここまで使えるのはありがたいです！記録が簡単なので毎日続きます。
            </p>
          </div>
          <div className="bg-white border rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="ユーザー3"
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
                loading="lazy"
                style={{ width: "40px", height: "40px" }}
              />
              <div>
                <div className="font-bold text-gray-900 text-sm">みほさん</div>
                <div className="text-gray-500 text-xs">40代 / 主婦</div>
              </div>
            </div>
            <p className="text-gray-700">
              面倒くさがりの私でもストレスなく使えます。サポートも丁寧で安心です。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
