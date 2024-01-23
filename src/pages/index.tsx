import Page from "../components/Layout/Page";

export default function Home() {
  return (
    <Page pageColor="#f0f0f0" back="/test">
      <img className="animate-pulse" src="/svgs/logo.svg" alt="" />
      <p className="text-[32px] font-[500]">stamps!</p>
      <p className="absolute bottom-[36px] text-[16px]">by entropy labs</p>
    </Page>
  );
}
