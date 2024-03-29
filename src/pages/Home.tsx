import {useTranslation} from "react-i18next";

export default function Home() {
	const {t, i18n} = useTranslation();
	return (
		<>
			<div className=" lg:w-full ">
				<div className="bg-gray-50/90 w-full py-12">
					<div
						className={
							i18n.resolvedLanguage == "en"
								? " grid w-full px-4 gap-4 md:grid-cols-2 md:px-6 lg:px-12"
								: " grid w-full px-4 gap-4 md:grid-cols-2 md:px-6 lg:px-12 direction"
						}
					>
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2 relative">
								<h1 className="text-black text-3xl font-bold tracking-tighter sm:text-5xl lg:text-center lg:mb-[1rem]">
									{t("homeHeader")}
								</h1>
								<p className="max-w-[500px] text-gray-500 md:text-xl dark:text-gray-400 lg:text-center lg:mx-auto">
									{t("homeText")}
								</p>
								<div
									className={
										i18n.resolvedLanguage == "ar"
											? "absolute text-[1.25rem] -top-[60px] left-[32%] lg:left-[38%] lg:-top-[70px] flex items-center gap-3 "
											: "absolute text-[1.25rem] -top-[60px] left-[27%] lg:left-[33%] lg:-top-[70px] flex items-center gap-3 "
									}
								>
									<img
										src="https://assets-global.website-files.com/62978b08056c54a3d308f189/658a96c55bddf78fa1744138_Vector%20(3).svg"
										loading="lazy"
										alt="OpenAI logo"
									/>
									<div className="text-black font-bold">Powered by Vosks</div>
								</div>
							</div>
						</div>

						<img src="src/assets/home_img.jpg" alt="child hold a headphone" />
					</div>
				</div>
				<section className="w-full py-12 md:py-16 xl:py-24 ">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								{t("S1Header")}
							</h2>
							<p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								{t("S1Text")}
							</p>
						</div>
						<div className=" grid max-w-sm gap-4 border border-gray-200 rounded-lg bg-gray-50 p-4 text-sm leading-none divide-y divide-gray-200 dark:border-gray-800 dark:bg-gray-950 dark:divide-gray-800">
							<div
								className={
									i18n.resolvedLanguage == "en"
										? "flex items-center  gap-2"
										: "flex items-center  gap-2 direction"
								}
							>
								<div className={"w-4 h-4 rounded-full bg-gray-900"} />
								<p className={"py-2.5  text-black"}>{t("step1")}</p>
							</div>
							<div
								className={
									i18n.resolvedLanguage == "en"
										? "flex items-center  gap-2"
										: "flex items-center  gap-2 direction"
								}
							>
								<div className="w-4 h-4 rounded-full bg-gray-900" />
								<p className="py-2.5 text-black">{t("step2")}</p>
							</div>
							<div
								className={
									i18n.resolvedLanguage == "en"
										? "flex items-center  gap-2"
										: "flex items-center  gap-2 direction"
								}
							>
								<div className="w-4 h-4 rounded-full bg-gray-900" />
								<p className="py-2.5 text-black">{t("step3")}</p>
							</div>
							<div
								className={
									i18n.resolvedLanguage == "en"
										? "flex items-center  gap-2"
										: "flex items-center  gap-2 direction"
								}
							>
								<div className="w-4 h-4 rounded-full bg-gray-900" />
								<p className="py-2.5 text-black  dark:text-gray-400">
									{t("step4")}
								</p>
							</div>
							<div
								className={
									i18n.resolvedLanguage == "en"
										? "flex items-center  gap-2"
										: "flex items-center  gap-2 direction"
								}
							>
								<div className="w-4 h-4 rounded-full bg-gray-900" />
								<p className="py-2.5 text-black  dark:text-gray-400">
									{t("step5")}
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-16 xl:py-24">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="space-y-2 flex items-center justify-center flex-col gap-4">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								{t("keyFeatures")}
							</h2>
							<p className="max-w-[800px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								{t("featuresText")}
							</p>
							<div className="w-[307px] grid max-w-sm gap-4 border border-gray-200 rounded-lg bg-gray-50 p-4 text-sm leading-none divide-y divide-gray-200 dark:border-gray-800 dark:bg-gray-950 dark:divide-gray-800">
								<div
									className={
										i18n.resolvedLanguage == "en"
											? "flex items-center  gap-2"
											: "flex items-center  gap-2 direction"
									}
								>
									<div className="w-4 h-4 rounded-full bg-gray-900" />
									<p className="py-2.5 text-black">{t("feature1")}</p>
								</div>
								<div
									className={
										i18n.resolvedLanguage == "en"
											? "flex items-center  gap-2"
											: "flex items-center  gap-2 direction"
									}
								>
									<div className="w-4 h-4 rounded-full bg-gray-900" />
									<p className="py-2.5 text-black">{t("feature2")}</p>
								</div>
								<div
									className={
										i18n.resolvedLanguage == "en"
											? "flex items-center  gap-2"
											: "flex items-center  gap-2 direction"
									}
								>
									<div className="w-4 h-4 rounded-full bg-gray-900" />
									<p className="py-2.5 text-black">{t("feature3")}</p>
								</div>
								<div
									className={
										i18n.resolvedLanguage == "en"
											? "flex items-center  gap-2"
											: "flex items-center  gap-2 direction"
									}
								>
									<div className="w-4 h-4 rounded-full bg-gray-900" />
									<p className="py-2.5 text-black">{t("feature4")}</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<p className="text-center">ReadAi dev</p>
		</>
	);
}
