import SettingComponent from "../components/SettingComponent.tsx";

export default function Settings() {
return (
		<div>
			<SettingComponent />

			{/* <div className="w-[400px] border rounded-md border-white mx-auto m-[1rem] p-[15px]">
				<ul>
					<li
						className={
							i18n.resolvedLanguage == "en"
								? "flex gap-4 "
								: "flex gap-4 direction"
						}
					>
						{<span className={"text-white "}>{t("language")}</span>}
						{Object.keys(lngs).map((lng) => (
							<button
								key={lng}
								className={
									i18n.resolvedLanguage === lng
										? "hidden"
										: "text-white border border-white rounded-sm px-[5px]"
								}
								onClick={() => {
									console.log(lng);

									i18n.changeLanguage(lng);
								}}
							>
								{lngs[lng].nativeName}
							</button>
						))}
						{/* i18n.resolvedLanguage == "ar" && (
						<span className={"text-white direction"}>{t("language")}</span>
					) }
					</li>
				</ul>
				</div> */}
		</div>
	);
}
