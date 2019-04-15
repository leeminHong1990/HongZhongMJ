<GameFile>
  <PropertyGroup Name="CreateAgentRoomUI" Type="Layer" ID="abc34471-0447-4818-b5bc-872a89523b8a" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="537" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="createroom_panel" ActionTag="359421217" Tag="539" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="29" RightEage="29" TopEage="35" BottomEage="35" Scale9OriginX="29" Scale9OriginY="35" Scale9Width="1222" Scale9Height="650" ctype="PanelObjectData">
            <Size X="1280.0000" Y="720.0000" />
            <Children>
              <AbstractNodeData Name="title_img" ActionTag="-443830276" Tag="544" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="548.5680" RightMargin="553.4320" TopMargin="-0.6800" BottomMargin="674.6800" LeftEage="48" RightEage="48" TopEage="15" BottomEage="15" Scale9OriginX="48" Scale9OriginY="15" Scale9Width="82" Scale9Height="16" ctype="ImageViewObjectData">
                <Size X="178.0000" Y="46.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="637.5680" Y="697.6800" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4981" Y="0.9690" />
                <PreSize X="0.1391" Y="0.0639" />
                <FileData Type="Normal" Path="CreateAgentRoomUI/agent_title.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="return_btn" ActionTag="-933136569" Tag="545" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="55.8000" RightMargin="1054.2000" TopMargin="-6.6880" BottomMargin="670.6880" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="116" Scale9Height="34" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="170.0000" Y="56.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="140.8000" Y="698.6880" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1100" Y="0.9704" />
                <PreSize X="0.1328" Y="0.0778" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="Normal" Path="Default/back_btn.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="gxmj_panel" ActionTag="-1520708237" Tag="547" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="607.6080" RightMargin="22.3920" TopMargin="66.9680" BottomMargin="3.0320" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="650.0000" Y="650.0000" />
                <Children>
                  <AbstractNodeData Name="create_btn" ActionTag="237259243" Tag="548" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="268.3800" RightMargin="131.6200" TopMargin="546.3100" BottomMargin="3.6900" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="222" Scale9Height="92" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                    <Size X="250.0000" Y="100.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="393.3800" Y="53.6900" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.6052" Y="0.0826" />
                    <PreSize X="0.3846" Y="0.1538" />
                    <TextColor A="255" R="65" G="65" B="70" />
                    <NormalFileData Type="Normal" Path="Default/ok_btn.png" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="tips_label" ActionTag="2053317184" Tag="549" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-17.9900" RightMargin="117.9900" TopMargin="478.5450" BottomMargin="141.4550" IsCustomSize="True" FontSize="20" LabelText="注：房卡在开始游戏后扣除，提前解散房间不扣房卡" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="550.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="257.0100" Y="156.4550" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="144" G="175" B="104" />
                    <PrePosition X="0.3954" Y="0.2407" />
                    <PreSize X="0.8462" Y="0.0462" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="mode_label" ActionTag="660497155" Tag="550" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="7.9800" RightMargin="542.0200" TopMargin="97.8550" BottomMargin="518.1450" IsCustomSize="True" FontSize="30" LabelText="规则：" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="34.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="57.9800" Y="535.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.0892" Y="0.8233" />
                    <PreSize X="0.1538" Y="0.0523" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="game_mode_chx1" ActionTag="441324419" Tag="551" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="96.9800" RightMargin="501.0200" TopMargin="91.8550" BottomMargin="512.1450" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="122.9800" Y="535.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1892" Y="0.8233" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="game_mode_chx2" ActionTag="-1114331172" Tag="552" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="272.4800" RightMargin="325.5200" TopMargin="91.8550" BottomMargin="512.1450" TouchEnable="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="298.4800" Y="535.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4592" Y="0.8233" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="game_mode_label_1" ActionTag="-636226574" Tag="553" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="142.4800" RightMargin="357.5200" TopMargin="98.8550" BottomMargin="519.1450" IsCustomSize="True" FontSize="30" LabelText="普通麻将" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="142.4800" Y="535.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.2192" Y="0.8233" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="game_mode_label_2" ActionTag="-268043007" Tag="554" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="317.9800" RightMargin="182.0200" TopMargin="98.8550" BottomMargin="519.1450" IsCustomSize="True" FontSize="30" LabelText="东带庄" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="317.9800" Y="535.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.4892" Y="0.8233" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="round_label" ActionTag="1995150787" Tag="555" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="7.9800" RightMargin="542.0200" TopMargin="162.2950" BottomMargin="455.7050" IsCustomSize="True" FontSize="30" LabelText="局数：" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="32.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="57.9800" Y="471.7050" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.0892" Y="0.7257" />
                    <PreSize X="0.1538" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="round_chx1" ActionTag="1404315520" Tag="556" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="96.9800" RightMargin="501.0200" TopMargin="156.8550" BottomMargin="447.1450" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="122.9800" Y="470.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1892" Y="0.7233" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="round_chx2" ActionTag="1947625019" Tag="557" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="272.4800" RightMargin="325.5200" TopMargin="156.8550" BottomMargin="447.1450" TouchEnable="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="298.4800" Y="470.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4592" Y="0.7233" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="round_chx3" ActionTag="734361145" Tag="558" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="447.9800" RightMargin="150.0200" TopMargin="156.8550" BottomMargin="447.1450" TouchEnable="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="473.9800" Y="470.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.7292" Y="0.7233" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="round_num_label_1" ActionTag="1149657203" Tag="559" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="142.4800" RightMargin="357.5200" TopMargin="163.8550" BottomMargin="454.1450" IsCustomSize="True" FontSize="30" LabelText="8局" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="142.4800" Y="470.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.2192" Y="0.7233" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="round_num_label_2" ActionTag="-288738306" Tag="560" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="317.9800" RightMargin="182.0200" TopMargin="163.8550" BottomMargin="454.1450" IsCustomSize="True" FontSize="30" LabelText="16局" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="317.9800" Y="470.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.4892" Y="0.7233" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="round_num_label_3" ActionTag="1877963363" Tag="561" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="493.4800" RightMargin="6.5200" TopMargin="163.8550" BottomMargin="454.1450" IsCustomSize="True" FontSize="30" LabelText="24局" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="493.4800" Y="470.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.7592" Y="0.7233" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="max_lose_label" ActionTag="-1076681425" Tag="562" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="7.9800" RightMargin="542.0200" TopMargin="228.8550" BottomMargin="389.1450" IsCustomSize="True" FontSize="30" LabelText="封顶：" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="32.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="57.9800" Y="405.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.0892" Y="0.6233" />
                    <PreSize X="0.1538" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="max_lose_chx1" ActionTag="-765686125" Tag="563" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="96.9800" RightMargin="501.0200" TopMargin="221.8550" BottomMargin="382.1450" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="122.9800" Y="405.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1892" Y="0.6233" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="max_lose_chx2" ActionTag="2059271260" Tag="564" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="272.4800" RightMargin="325.5200" TopMargin="221.8550" BottomMargin="382.1450" TouchEnable="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="298.4800" Y="405.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4592" Y="0.6233" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="max_lose_chx3" ActionTag="-1829685932" Tag="565" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="96.9800" RightMargin="501.0200" TopMargin="286.8550" BottomMargin="317.1450" TouchEnable="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="122.9800" Y="340.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1892" Y="0.5233" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="max_lose_chx4" ActionTag="-1690073262" Tag="566" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="272.4800" RightMargin="325.5200" TopMargin="286.8550" BottomMargin="317.1450" TouchEnable="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="298.4800" Y="340.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4592" Y="0.5233" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="max_lose_num_label_1" ActionTag="-284783461" Tag="567" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="142.4800" RightMargin="357.5200" TopMargin="228.8550" BottomMargin="389.1450" IsCustomSize="True" FontSize="30" LabelText="无封顶" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="142.4800" Y="405.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.2192" Y="0.6233" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="max_lose_num_label_2" ActionTag="-548667578" Tag="568" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="317.9800" RightMargin="182.0200" TopMargin="228.8550" BottomMargin="389.1450" IsCustomSize="True" FontSize="30" LabelText="10分封顶" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="317.9800" Y="405.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.4892" Y="0.6233" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="max_lose_num_label_3" ActionTag="2126892635" Tag="569" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="142.4800" RightMargin="357.5200" TopMargin="293.8550" BottomMargin="324.1450" IsCustomSize="True" FontSize="30" LabelText="20分封顶" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="142.4800" Y="340.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.2192" Y="0.5233" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="max_lose_num_label_4" ActionTag="-1005052486" Tag="570" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="317.9800" RightMargin="182.0200" TopMargin="293.8550" BottomMargin="324.1450" IsCustomSize="True" FontSize="30" LabelText="30分封顶" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="317.9800" Y="340.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.4892" Y="0.5233" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="treasure_label" ActionTag="1713387937" Tag="571" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="7.9800" RightMargin="542.0200" TopMargin="363.8600" BottomMargin="254.1400" IsCustomSize="True" FontSize="30" LabelText="摸宝：" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="32.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="57.9800" Y="270.1400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.0892" Y="0.4156" />
                    <PreSize X="0.1538" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="treasure_chx1" ActionTag="-961597117" Tag="572" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="96.9800" RightMargin="501.0200" TopMargin="351.8550" BottomMargin="252.1450" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="122.9800" Y="275.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1892" Y="0.4233" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="treasure_chx2" ActionTag="-682957743" Tag="573" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="272.4800" RightMargin="325.5200" TopMargin="351.8550" BottomMargin="252.1450" TouchEnable="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="298.4800" Y="275.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4592" Y="0.4233" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="treasure_chx3" ActionTag="990940816" Tag="574" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="447.9800" RightMargin="150.0200" TopMargin="351.8550" BottomMargin="252.1450" TouchEnable="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="473.9800" Y="275.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.7292" Y="0.4233" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="treasure_num_label_1" ActionTag="-1108277431" Tag="575" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="142.4800" RightMargin="357.5200" TopMargin="358.8550" BottomMargin="259.1450" IsCustomSize="True" FontSize="30" LabelText="不摸宝" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="142.4800" Y="275.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.2192" Y="0.4233" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="treasure_num_label_2" ActionTag="1903690726" Tag="576" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="317.9800" RightMargin="182.0200" TopMargin="358.8550" BottomMargin="259.1450" IsCustomSize="True" FontSize="30" LabelText="摸1宝" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="317.9800" Y="275.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.4892" Y="0.4233" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="treasure_num_label_3" ActionTag="-1586659347" Tag="577" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="493.4800" RightMargin="6.5200" TopMargin="358.8550" BottomMargin="259.1450" IsCustomSize="True" FontSize="30" LabelText="摸2宝" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="493.4800" Y="275.1450" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.7592" Y="0.4233" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="discard_seconds_label" ActionTag="1446973436" VisibleForFrame="False" Tag="578" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="15.0000" RightMargin="535.0000" TopMargin="374.0000" BottomMargin="244.0000" IsCustomSize="True" FontSize="30" LabelText="出牌：" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="32.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="65.0000" Y="260.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="131" G="96" B="77" />
                    <PrePosition X="0.1000" Y="0.4000" />
                    <PreSize X="0.1538" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="discard_seconds_chx1" ActionTag="441206975" VisibleForFrame="False" Tag="579" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="104.0000" RightMargin="494.0000" TopMargin="367.0000" BottomMargin="237.0000" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="130.0000" Y="260.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.2000" Y="0.4000" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="discard_seconds_chx2" ActionTag="723533566" VisibleForFrame="False" Tag="580" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="279.5000" RightMargin="318.5000" TopMargin="367.0000" BottomMargin="237.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="305.5000" Y="260.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4700" Y="0.4000" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="discard_seconds_chx3" ActionTag="1806600954" VisibleForFrame="False" Tag="581" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="455.0000" RightMargin="143.0000" TopMargin="367.0000" BottomMargin="237.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="481.0000" Y="260.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.7400" Y="0.4000" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="discard_seconds_num_label_1" ActionTag="244177279" VisibleForFrame="False" Tag="582" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="149.5000" RightMargin="350.5000" TopMargin="374.0000" BottomMargin="244.0000" IsCustomSize="True" FontSize="30" LabelText="无限制" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="149.5000" Y="260.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="131" G="96" B="77" />
                    <PrePosition X="0.2300" Y="0.4000" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="discard_seconds_num_label_2" ActionTag="-1197575203" VisibleForFrame="False" Tag="583" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="325.0000" RightMargin="175.0000" TopMargin="374.0000" BottomMargin="244.0000" IsCustomSize="True" FontSize="30" LabelText="10秒" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="325.0000" Y="260.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="131" G="96" B="77" />
                    <PrePosition X="0.5000" Y="0.4000" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="discard_seconds_num_label_3" ActionTag="-348297751" VisibleForFrame="False" Tag="584" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="500.5000" RightMargin="-0.5000" TopMargin="374.0000" BottomMargin="244.0000" IsCustomSize="True" FontSize="30" LabelText="15秒" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="150.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="500.5000" Y="260.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="131" G="96" B="77" />
                    <PrePosition X="0.7700" Y="0.4000" />
                    <PreSize X="0.2308" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="cost_label" ActionTag="-1111256945" Tag="585" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="7.9800" RightMargin="542.0200" TopMargin="428.8600" BottomMargin="189.1400" IsCustomSize="True" FontSize="30" LabelText="消耗：" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="32.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="57.9800" Y="205.1400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.0892" Y="0.3156" />
                    <PreSize X="0.1538" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="cost_num_label" ActionTag="1419322172" Tag="586" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="169.0000" RightMargin="381.0000" TopMargin="428.8600" BottomMargin="189.1400" IsCustomSize="True" FontSize="30" LabelText="x 99" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="32.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="169.0000" Y="205.1400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.2600" Y="0.3156" />
                    <PreSize X="0.1538" Y="0.0492" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="card_img" ActionTag="831286568" Tag="587" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="102.0000" RightMargin="482.0000" TopMargin="422.8600" BottomMargin="183.1400" LeftEage="21" RightEage="21" TopEage="14" BottomEage="14" Scale9OriginX="21" Scale9OriginY="14" Scale9Width="24" Scale9Height="16" ctype="ImageViewObjectData">
                    <Size X="66.0000" Y="44.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="135.0000" Y="205.1400" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.2077" Y="0.3156" />
                    <PreSize X="0.1015" Y="0.0677" />
                    <FileData Type="Normal" Path="GameHallUI/card.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="prepare_chx" ActionTag="-1292737988" Tag="588" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="26.0000" RightMargin="572.0000" TopMargin="573.3100" BottomMargin="30.6900" TouchEnable="True" ctype="CheckBoxObjectData">
                    <Size X="52.0000" Y="46.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="52.0000" Y="53.6900" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.0800" Y="0.0826" />
                    <PreSize X="0.0800" Y="0.0708" />
                    <NormalBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <PressedBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <DisableBackFileData Type="Normal" Path="HelpUI/chx_bg.png" Plist="" />
                    <NodeNormalFileData Type="Normal" Path="HelpUI/chx_select.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="prepare_label" ActionTag="263650920" Tag="589" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="84.5000" RightMargin="365.5000" TopMargin="583.4800" BottomMargin="38.5200" IsCustomSize="True" FontSize="20" LabelText="手动准备开局" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="200.0000" Y="28.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="84.5000" Y="52.5200" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.1300" Y="0.0808" />
                    <PreSize X="0.3077" Y="0.0431" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="name_label" ActionTag="806939859" Tag="711" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="7.9800" RightMargin="542.0200" TopMargin="34.4800" BottomMargin="581.5200" IsCustomSize="True" FontSize="30" LabelText="游戏：" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="100.0000" Y="34.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="57.9800" Y="598.5200" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.0892" Y="0.9208" />
                    <PreSize X="0.1538" Y="0.0523" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="name_txt" ActionTag="1098652535" Tag="712" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="90.5900" RightMargin="379.4100" TopMargin="32.7840" BottomMargin="577.2160" IsCustomSize="True" FontSize="34" LabelText="贵溪麻将" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="180.0000" Y="40.0000" />
                    <AnchorPoint ScaleX="0.3995" ScaleY="1.4946" />
                    <Position X="162.5000" Y="637.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="220" G="179" B="125" />
                    <PrePosition X="0.2500" Y="0.9800" />
                    <PreSize X="0.2769" Y="0.0615" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="separator1" ActionTag="-642019929" Tag="1423" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="5.0000" RightMargin="5.0000" TopMargin="142.0000" BottomMargin="502.0000" LeftEage="81" RightEage="81" TopEage="1" BottomEage="1" Scale9OriginX="81" Scale9OriginY="1" Scale9Width="86" Scale9Height="4" ctype="ImageViewObjectData">
                    <Size X="640.0000" Y="6.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="325.0000" Y="505.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.7769" />
                    <PreSize X="0.9846" Y="0.0092" />
                    <FileData Type="Normal" Path="CreateAgentRoomUI/separator_1.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="separator2" ActionTag="-853123187" Tag="1424" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="5.0000" RightMargin="5.0000" TopMargin="207.0000" BottomMargin="437.0000" LeftEage="81" RightEage="81" TopEage="1" BottomEage="1" Scale9OriginX="81" Scale9OriginY="1" Scale9Width="86" Scale9Height="4" ctype="ImageViewObjectData">
                    <Size X="640.0000" Y="6.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="325.0000" Y="440.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.6769" />
                    <PreSize X="0.9846" Y="0.0092" />
                    <FileData Type="Normal" Path="CreateAgentRoomUI/separator_1.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="separator3" ActionTag="116638312" Tag="1425" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="5.0000" RightMargin="5.0000" TopMargin="337.0000" BottomMargin="307.0000" LeftEage="81" RightEage="81" TopEage="1" BottomEage="1" Scale9OriginX="81" Scale9OriginY="1" Scale9Width="86" Scale9Height="4" ctype="ImageViewObjectData">
                    <Size X="640.0000" Y="6.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="325.0000" Y="310.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.4769" />
                    <PreSize X="0.9846" Y="0.0092" />
                    <FileData Type="Normal" Path="CreateAgentRoomUI/separator_1.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="separator4" ActionTag="449596595" Tag="1426" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="5.0000" RightMargin="5.0000" TopMargin="406.0637" BottomMargin="237.9363" LeftEage="81" RightEage="81" TopEage="1" BottomEage="1" Scale9OriginX="81" Scale9OriginY="1" Scale9Width="86" Scale9Height="4" ctype="ImageViewObjectData">
                    <Size X="640.0000" Y="6.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="325.0000" Y="240.9363" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.3707" />
                    <PreSize X="0.9846" Y="0.0092" />
                    <FileData Type="Normal" Path="CreateAgentRoomUI/separator_1.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="separator5" ActionTag="502321108" Tag="866" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="5.0000" RightMargin="5.0000" TopMargin="472.0000" BottomMargin="172.0000" LeftEage="81" RightEage="81" TopEage="1" BottomEage="1" Scale9OriginX="81" Scale9OriginY="1" Scale9Width="86" Scale9Height="4" ctype="ImageViewObjectData">
                    <Size X="640.0000" Y="6.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="325.0000" Y="175.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.2692" />
                    <PreSize X="0.9846" Y="0.0092" />
                    <FileData Type="Normal" Path="CreateAgentRoomUI/separator_1.png" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="932.6080" Y="328.0320" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7286" Y="0.4556" />
                <PreSize X="0.5078" Y="0.9028" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="playing_btn" ActionTag="-19204883" Tag="723" IconVisible="False" LeftMargin="92.0000" RightMargin="972.0000" TopMargin="80.0000" BottomMargin="560.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="186" Scale9Height="58" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="216.0000" Y="80.0000" />
                <Children>
                  <AbstractNodeData Name="playing_img" ActionTag="-748981534" Tag="726" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="48.0000" RightMargin="48.0000" TopMargin="21.0000" BottomMargin="21.0000" LeftEage="39" RightEage="39" TopEage="12" BottomEage="12" Scale9OriginX="39" Scale9OriginY="12" Scale9Width="42" Scale9Height="14" ctype="ImageViewObjectData">
                    <Size X="120.0000" Y="38.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="108.0000" Y="40.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.5556" Y="0.4750" />
                    <FileData Type="Normal" Path="CreateAgentRoomUI/playing_btn.png" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="200.0000" Y="600.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1563" Y="0.8333" />
                <PreSize X="0.1688" Y="0.1111" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="Normal" Path="CreateAgentRoomUI/bright_icon.png" Plist="" />
                <PressedFileData Type="Normal" Path="CreateAgentRoomUI/bright_icon.png" Plist="" />
                <NormalFileData Type="Normal" Path="CreateAgentRoomUI/dark_icon.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="complete_btn" ActionTag="-1022871910" Tag="727" IconVisible="False" LeftMargin="302.0000" RightMargin="762.0000" TopMargin="80.0000" BottomMargin="560.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="186" Scale9Height="58" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="216.0000" Y="80.0000" />
                <Children>
                  <AbstractNodeData Name="complete_img" ActionTag="284106738" Tag="728" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" LeftMargin="50.0040" RightMargin="50.0040" TopMargin="22.0000" BottomMargin="22.0000" LeftEage="38" RightEage="38" TopEage="11" BottomEage="11" Scale9OriginX="38" Scale9OriginY="11" Scale9Width="40" Scale9Height="14" ctype="ImageViewObjectData">
                    <Size X="115.9920" Y="36.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="108.0000" Y="40.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.5370" Y="0.4500" />
                    <FileData Type="Normal" Path="CreateAgentRoomUI/complete_btn.png" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="410.0000" Y="600.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3203" Y="0.8333" />
                <PreSize X="0.1688" Y="0.1111" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="Normal" Path="CreateAgentRoomUI/bright_icon.png" Plist="" />
                <PressedFileData Type="Normal" Path="CreateAgentRoomUI/bright_icon.png" Plist="" />
                <NormalFileData Type="Normal" Path="CreateAgentRoomUI/dark_icon.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="scroll_bg" ActionTag="-435377447" Tag="851" IconVisible="False" LeftMargin="30.0000" RightMargin="682.0000" TopMargin="146.0000" BottomMargin="14.0000" LeftEage="187" RightEage="187" TopEage="184" BottomEage="184" Scale9OriginX="187" Scale9OriginY="184" Scale9Width="194" Scale9Height="192" ctype="ImageViewObjectData">
                <Size X="568.0000" Y="560.0000" />
                <AnchorPoint />
                <Position X="30.0000" Y="14.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0234" Y="0.0194" />
                <PreSize X="0.4437" Y="0.7778" />
                <FileData Type="Normal" Path="CreateAgentRoomUI/room_list_bg.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="playing_room_scroll" Visible="False" ActionTag="502601261" Tag="1392" IconVisible="False" LeftMargin="48.5463" RightMargin="701.4537" TopMargin="159.0000" BottomMargin="25.0000" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="187" RightEage="187" TopEage="184" BottomEage="184" Scale9OriginX="-187" Scale9OriginY="-184" Scale9Width="374" Scale9Height="368" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                <Size X="530.0000" Y="536.0000" />
                <Children>
                  <AbstractNodeData Name="playing_panel" ActionTag="1674543883" Tag="1393" IconVisible="False" PositionPercentXEnabled="True" RightMargin="-6.0000" TopMargin="386.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="172" RightEage="172" TopEage="40" BottomEage="40" Scale9OriginX="-172" Scale9OriginY="-40" Scale9Width="344" Scale9Height="80" ctype="PanelObjectData">
                    <Size X="536.0000" Y="150.0000" />
                    <Children>
                      <AbstractNodeData Name="room_info_bg" ActionTag="-641937090" Tag="1409" IconVisible="False" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="2.0000" RightMargin="-2.0000" TopMargin="14.0000" LeftEage="176" RightEage="176" TopEage="44" BottomEage="44" Scale9OriginX="176" Scale9OriginY="44" Scale9Width="184" Scale9Height="48" ctype="ImageViewObjectData">
                        <Size X="536.0000" Y="136.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="270.0000" Y="68.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5037" Y="0.4533" />
                        <PreSize X="1.0000" Y="0.9067" />
                        <FileData Type="Normal" Path="CreateAgentRoomUI/info_bg.png" Plist="" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="room_title_bg" ActionTag="-340942643" Tag="1410" IconVisible="False" PositionPercentXEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="8.0400" RightMargin="8.0400" TopMargin="-0.6005" BottomMargin="114.6005" LeftEage="123" RightEage="123" TopEage="11" BottomEage="11" Scale9OriginX="123" Scale9OriginY="11" Scale9Width="128" Scale9Height="14" ctype="ImageViewObjectData">
                        <Size X="519.9200" Y="36.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="268.0000" Y="132.6005" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.8840" />
                        <PreSize X="0.9700" Y="0.2400" />
                        <FileData Type="Normal" Path="CreateAgentRoomUI/title_bg.png" Plist="" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="player_panel_0" ActionTag="-1793355691" Tag="1399" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="16.0800" RightMargin="447.9200" TopMargin="46.0000" BottomMargin="30.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="25" RightEage="25" TopEage="25" BottomEage="25" Scale9OriginX="-25" Scale9OriginY="-25" Scale9Width="50" Scale9Height="50" ctype="PanelObjectData">
                        <Size X="72.0000" Y="74.0000" />
                        <Children>
                          <AbstractNodeData Name="icon_img" ActionTag="1921988449" Tag="1400" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" LeftEage="33" RightEage="33" TopEage="33" BottomEage="33" Scale9OriginX="33" Scale9OriginY="33" Scale9Width="34" Scale9Height="34" ctype="ImageViewObjectData">
                            <Size X="72.0000" Y="74.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="37.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <FileData Type="Normal" Path="GameHallUI/portrait_sprite.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_bg" ActionTag="-1348049721" Tag="859" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" LeftMargin="-7.2000" RightMargin="-7.2000" TopMargin="48.1592" BottomMargin="-2.1608" LeftEage="34" RightEage="34" TopEage="9" BottomEage="9" Scale9OriginX="34" Scale9OriginY="9" Scale9Width="22" Scale9Height="10" ctype="ImageViewObjectData">
                            <Size X="86.4000" Y="28.0016" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.2000" Y="0.3784" />
                            <FileData Type="Normal" Path="Default/name_bg.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_label" ActionTag="-1546104395" Tag="808" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-4.0000" RightMargin="-4.0000" TopMargin="52.6600" BottomMargin="2.3400" IsCustomSize="True" FontSize="14" LabelText="我我我我我我我" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="80.0000" Y="19.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="0.9500" ScaleY="0.9500" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.1111" Y="0.2568" />
                            <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint />
                        <Position X="16.0800" Y="30.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0300" Y="0.2000" />
                        <PreSize X="0.1343" Y="0.4933" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="player_panel_1" ActionTag="-1345293345" Tag="1401" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="96.4800" RightMargin="367.5200" TopMargin="46.0000" BottomMargin="30.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="25" RightEage="25" TopEage="25" BottomEage="25" Scale9OriginX="-25" Scale9OriginY="-25" Scale9Width="50" Scale9Height="50" ctype="PanelObjectData">
                        <Size X="72.0000" Y="74.0000" />
                        <Children>
                          <AbstractNodeData Name="icon_img" ActionTag="-853645521" Tag="1402" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" LeftEage="33" RightEage="33" TopEage="33" BottomEage="33" Scale9OriginX="33" Scale9OriginY="33" Scale9Width="34" Scale9Height="34" ctype="ImageViewObjectData">
                            <Size X="72.0000" Y="74.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="37.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <FileData Type="Normal" Path="GameHallUI/portrait_sprite.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_bg" ActionTag="-348942450" Tag="858" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="-7.2000" RightMargin="-7.2000" TopMargin="48.1600" BottomMargin="-2.1600" LeftEage="34" RightEage="34" TopEage="9" BottomEage="9" Scale9OriginX="34" Scale9OriginY="9" Scale9Width="22" Scale9Height="10" ctype="ImageViewObjectData">
                            <Size X="86.4000" Y="28.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.2000" Y="0.3784" />
                            <FileData Type="Normal" Path="Default/name_bg.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_label" ActionTag="-1108337439" Tag="806" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-4.0000" RightMargin="-4.0000" TopMargin="52.6600" BottomMargin="2.3400" IsCustomSize="True" FontSize="14" LabelText="我我我我我我我" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="80.0000" Y="19.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="0.9500" ScaleY="0.9500" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.1111" Y="0.2568" />
                            <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint />
                        <Position X="96.4800" Y="30.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.1800" Y="0.2000" />
                        <PreSize X="0.1343" Y="0.4933" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="player_panel_2" ActionTag="-1954184844" Tag="1403" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="176.8800" RightMargin="287.1200" TopMargin="46.0000" BottomMargin="30.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="25" RightEage="25" TopEage="25" BottomEage="25" Scale9OriginX="-25" Scale9OriginY="-25" Scale9Width="50" Scale9Height="50" ctype="PanelObjectData">
                        <Size X="72.0000" Y="74.0000" />
                        <Children>
                          <AbstractNodeData Name="icon_img" ActionTag="549722571" Tag="1404" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" LeftEage="33" RightEage="33" TopEage="33" BottomEage="33" Scale9OriginX="33" Scale9OriginY="33" Scale9Width="34" Scale9Height="34" ctype="ImageViewObjectData">
                            <Size X="72.0000" Y="74.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="37.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <FileData Type="Normal" Path="GameHallUI/portrait_sprite.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_bg" ActionTag="1989015312" Tag="857" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="-7.2000" RightMargin="-7.2000" TopMargin="48.1600" BottomMargin="-2.1600" LeftEage="34" RightEage="34" TopEage="9" BottomEage="9" Scale9OriginX="34" Scale9OriginY="9" Scale9Width="22" Scale9Height="10" ctype="ImageViewObjectData">
                            <Size X="86.4000" Y="28.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.2000" Y="0.3784" />
                            <FileData Type="Normal" Path="Default/name_bg.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_label" ActionTag="-1809527611" Tag="804" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-4.0000" RightMargin="-4.0000" TopMargin="52.6600" BottomMargin="2.3400" IsCustomSize="True" FontSize="14" LabelText="我我我我我我我" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="80.0000" Y="19.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="0.9500" ScaleY="0.9500" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.1111" Y="0.2568" />
                            <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint />
                        <Position X="176.8800" Y="30.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.3300" Y="0.2000" />
                        <PreSize X="0.1343" Y="0.4933" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="player_panel_3" ActionTag="-256863539" Tag="1405" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="257.2800" RightMargin="206.7200" TopMargin="46.0000" BottomMargin="30.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="25" RightEage="25" TopEage="25" BottomEage="25" Scale9OriginX="-25" Scale9OriginY="-25" Scale9Width="50" Scale9Height="50" ctype="PanelObjectData">
                        <Size X="72.0000" Y="74.0000" />
                        <Children>
                          <AbstractNodeData Name="icon_img" ActionTag="-485528820" Tag="1406" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" LeftEage="33" RightEage="33" TopEage="33" BottomEage="33" Scale9OriginX="33" Scale9OriginY="33" Scale9Width="34" Scale9Height="34" ctype="ImageViewObjectData">
                            <Size X="72.0000" Y="74.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="37.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <FileData Type="Normal" Path="GameHallUI/portrait_sprite.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_bg" ActionTag="-720353917" Tag="856" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="-7.2000" RightMargin="-7.2000" TopMargin="48.1600" BottomMargin="-2.1600" LeftEage="34" RightEage="34" TopEage="9" BottomEage="9" Scale9OriginX="34" Scale9OriginY="9" Scale9Width="22" Scale9Height="10" ctype="ImageViewObjectData">
                            <Size X="86.4000" Y="28.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.2000" Y="0.3784" />
                            <FileData Type="Normal" Path="Default/name_bg.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_label" ActionTag="62210304" Tag="802" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-4.0000" RightMargin="-4.0000" TopMargin="52.6600" BottomMargin="2.3400" IsCustomSize="True" FontSize="14" LabelText="我我我我我我我" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="80.0000" Y="19.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="0.9500" ScaleY="0.9500" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.1111" Y="0.2568" />
                            <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint />
                        <Position X="257.2800" Y="30.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.4800" Y="0.2000" />
                        <PreSize X="0.1343" Y="0.4933" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="room_detail_label" ActionTag="1620916129" Tag="1407" IconVisible="False" LeftMargin="15.0000" RightMargin="161.0000" TopMargin="122.0000" BottomMargin="8.0000" IsCustomSize="True" FontSize="16" LabelText="普通麻将，无封顶，摸1宝" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="360.0000" Y="20.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="15.0000" Y="18.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="165" G="115" B="77" />
                        <PrePosition X="0.0280" Y="0.1200" />
                        <PreSize X="0.6716" Y="0.1333" />
                        <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="invite_btn" Visible="False" ActionTag="307980713" Tag="1412" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="345.0000" RightMargin="101.0000" TopMargin="48.5000" BottomMargin="33.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="60" Scale9Height="46" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                        <Size X="90.0000" Y="68.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="390.0000" Y="67.5000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.7276" Y="0.4500" />
                        <PreSize X="0.1679" Y="0.4533" />
                        <TextColor A="255" R="65" G="65" B="70" />
                        <NormalFileData Type="Normal" Path="CreateAgentRoomUI/invite_btn.png" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="dismiss_btn" Visible="False" ActionTag="1687371880" Tag="1415" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="452.0000" RightMargin="28.0000" TopMargin="67.5000" BottomMargin="52.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="26" Scale9Height="8" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                        <Size X="56.0000" Y="30.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="480.0000" Y="67.5000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.8955" Y="0.4500" />
                        <PreSize X="0.1045" Y="0.2000" />
                        <TextColor A="255" R="65" G="65" B="70" />
                        <NormalFileData Type="Normal" Path="CreateAgentRoomUI/dismiss_btn.png" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="playing_label" ActionTag="682518172" Tag="1422" IconVisible="False" PositionPercentYEnabled="True" LeftMargin="361.0000" RightMargin="37.0000" TopMargin="61.5000" BottomMargin="61.5000" FontSize="24" LabelText="游戏中(16/16)" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="138.0000" Y="27.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="430.0000" Y="75.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="165" B="0" />
                        <PrePosition X="0.8022" Y="0.5000" />
                        <PreSize X="0.2575" Y="0.1800" />
                        <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="game_name" ActionTag="-302934137" Tag="1416" IconVisible="False" LeftMargin="12.5000" RightMargin="432.5000" TopMargin="5.5000" BottomMargin="119.5000" FontSize="22" LabelText="贵溪麻将 " ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="91.0000" Y="25.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="58.0000" Y="132.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="237" G="251" B="220" />
                        <PrePosition X="0.1082" Y="0.8800" />
                        <PreSize X="0.1698" Y="0.1667" />
                        <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="room_id_label" ActionTag="696837863" Tag="1417" IconVisible="False" LeftMargin="118.0000" RightMargin="294.0000" TopMargin="5.5000" BottomMargin="119.5000" FontSize="22" LabelText="房号:888888" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="124.0000" Y="25.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="180.0000" Y="132.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="237" G="251" B="220" />
                        <PrePosition X="0.3358" Y="0.8800" />
                        <PreSize X="0.2313" Y="0.1667" />
                        <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="round_label" ActionTag="-1290063845" Tag="1420" IconVisible="False" LeftMargin="253.0000" RightMargin="239.0000" TopMargin="5.5000" BottomMargin="119.5000" FontSize="22" LabelText="16局" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="44.0000" Y="25.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="275.0000" Y="132.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="237" G="251" B="220" />
                        <PrePosition X="0.5131" Y="0.8800" />
                        <PreSize X="0.0821" Y="0.1667" />
                        <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="1.0113" Y="0.2799" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="48.5463" Y="25.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0379" Y="0.0347" />
                <PreSize X="0.4141" Y="0.7444" />
                <SingleColor A="255" R="255" G="150" B="100" />
                <FirstColor A="255" R="255" G="150" B="100" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
                <InnerNodeSize Width="530" Height="536" />
              </AbstractNodeData>
              <AbstractNodeData Name="complete_room_scroll" ActionTag="300298046" Tag="811" IconVisible="False" LeftMargin="48.5500" RightMargin="701.4500" TopMargin="159.0000" BottomMargin="25.0000" TouchEnable="True" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="187" RightEage="187" TopEage="184" BottomEage="184" Scale9OriginX="-187" Scale9OriginY="-184" Scale9Width="374" Scale9Height="368" ScrollDirectionType="Vertical" ctype="ScrollViewObjectData">
                <Size X="530.0000" Y="536.0000" />
                <Children>
                  <AbstractNodeData Name="complete_panel" ActionTag="-662683800" Tag="838" IconVisible="False" PositionPercentXEnabled="True" RightMargin="-6.0000" TopMargin="386.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="172" RightEage="172" TopEage="40" BottomEage="40" Scale9OriginX="-172" Scale9OriginY="-40" Scale9Width="344" Scale9Height="80" ctype="PanelObjectData">
                    <Size X="536.0000" Y="150.0000" />
                    <Children>
                      <AbstractNodeData Name="room_info_bg" ActionTag="-557417289" Tag="839" IconVisible="False" LeftMargin="0.8648" RightMargin="-0.8648" TopMargin="14.0000" LeftEage="176" RightEage="176" TopEage="44" BottomEage="44" Scale9OriginX="176" Scale9OriginY="44" Scale9Width="184" Scale9Height="48" ctype="ImageViewObjectData">
                        <Size X="536.0000" Y="136.0000" />
                        <AnchorPoint />
                        <Position X="0.8648" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.0016" />
                        <PreSize X="1.0000" Y="0.9067" />
                        <FileData Type="Normal" Path="CreateAgentRoomUI/info_bg.png" Plist="" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="room_title_bg" ActionTag="-696361224" Tag="840" IconVisible="False" PositionPercentXEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="8.0400" RightMargin="8.0400" BottomMargin="114.0000" LeftEage="123" RightEage="123" TopEage="11" BottomEage="11" Scale9OriginX="123" Scale9OriginY="11" Scale9Width="128" Scale9Height="14" ctype="ImageViewObjectData">
                        <Size X="519.9200" Y="36.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="268.0000" Y="132.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5000" Y="0.8800" />
                        <PreSize X="0.9700" Y="0.2400" />
                        <FileData Type="Normal" Path="CreateAgentRoomUI/title_bg.png" Plist="" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="player_panel_0" ActionTag="-1986981893" Tag="841" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="53.6000" RightMargin="410.4000" TopMargin="56.0000" BottomMargin="20.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="25" RightEage="25" TopEage="25" BottomEage="25" Scale9OriginX="-25" Scale9OriginY="-25" Scale9Width="50" Scale9Height="50" ctype="PanelObjectData">
                        <Size X="72.0000" Y="74.0000" />
                        <Children>
                          <AbstractNodeData Name="icon_img" ActionTag="1957502498" Tag="842" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" LeftEage="33" RightEage="33" TopEage="33" BottomEage="33" Scale9OriginX="33" Scale9OriginY="33" Scale9Width="34" Scale9Height="34" ctype="ImageViewObjectData">
                            <Size X="72.0000" Y="74.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="37.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <FileData Type="Normal" Path="GameHallUI/portrait_sprite.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_bg" ActionTag="-631491019" Tag="855" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="-7.2000" RightMargin="-7.2000" TopMargin="48.1600" BottomMargin="-2.1600" LeftEage="34" RightEage="34" TopEage="9" BottomEage="9" Scale9OriginX="34" Scale9OriginY="9" Scale9Width="22" Scale9Height="10" ctype="ImageViewObjectData">
                            <Size X="86.4000" Y="28.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.2000" Y="0.3784" />
                            <FileData Type="Normal" Path="Default/name_bg.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_label" ActionTag="-1725334342" Tag="844" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-4.0000" RightMargin="-4.0000" TopMargin="52.6600" BottomMargin="2.3400" IsCustomSize="True" FontSize="14" LabelText="我我我" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="80.0000" Y="19.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="0.9500" ScaleY="0.9500" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.1111" Y="0.2568" />
                            <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="score" ActionTag="62709519" Tag="843" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="12.0000" RightMargin="12.0000" TopMargin="73.0000" BottomMargin="-17.0000" FontSize="16" LabelText="+9999" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="48.0000" Y="18.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="-8.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="0" B="0" />
                            <PrePosition X="0.5000" Y="-0.1081" />
                            <PreSize X="0.6667" Y="0.2432" />
                            <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint />
                        <Position X="53.6000" Y="20.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.1000" Y="0.1333" />
                        <PreSize X="0.1343" Y="0.4933" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="player_panel_1" ActionTag="-152923206" Tag="846" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="171.5200" RightMargin="292.4800" TopMargin="56.0000" BottomMargin="20.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="25" RightEage="25" TopEage="25" BottomEage="25" Scale9OriginX="-25" Scale9OriginY="-25" Scale9Width="50" Scale9Height="50" ctype="PanelObjectData">
                        <Size X="72.0000" Y="74.0000" />
                        <Children>
                          <AbstractNodeData Name="icon_img" ActionTag="-1779723708" Tag="848" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" LeftEage="33" RightEage="33" TopEage="33" BottomEage="33" Scale9OriginX="33" Scale9OriginY="33" Scale9Width="34" Scale9Height="34" ctype="ImageViewObjectData">
                            <Size X="72.0000" Y="74.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="37.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <FileData Type="Normal" Path="GameHallUI/portrait_sprite.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_bg" ActionTag="-1493750643" Tag="854" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="-7.2000" RightMargin="-7.2000" TopMargin="48.1600" BottomMargin="-2.1600" LeftEage="34" RightEage="34" TopEage="9" BottomEage="9" Scale9OriginX="34" Scale9OriginY="9" Scale9Width="22" Scale9Height="10" ctype="ImageViewObjectData">
                            <Size X="86.4000" Y="28.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.2000" Y="0.3784" />
                            <FileData Type="Normal" Path="Default/name_bg.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_label" ActionTag="947729752" Tag="849" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-4.0000" RightMargin="-4.0000" TopMargin="52.6600" BottomMargin="2.3400" IsCustomSize="True" FontSize="14" LabelText="我我我我我我我" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="80.0000" Y="19.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="0.9500" ScaleY="0.9500" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.1111" Y="0.2568" />
                            <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="score" ActionTag="-284586065" Tag="847" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="12.0000" RightMargin="12.0000" TopMargin="73.0000" BottomMargin="-17.0000" FontSize="16" LabelText="+9999" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="48.0000" Y="18.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="-8.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="0" B="0" />
                            <PrePosition X="0.5000" Y="-0.1081" />
                            <PreSize X="0.6667" Y="0.2432" />
                            <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint />
                        <Position X="171.5200" Y="20.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.3200" Y="0.1333" />
                        <PreSize X="0.1343" Y="0.4933" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="player_panel_2" ActionTag="-2059253117" Tag="851" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="289.4400" RightMargin="174.5600" TopMargin="56.0000" BottomMargin="20.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="25" RightEage="25" TopEage="25" BottomEage="25" Scale9OriginX="-25" Scale9OriginY="-25" Scale9Width="50" Scale9Height="50" ctype="PanelObjectData">
                        <Size X="72.0000" Y="74.0000" />
                        <Children>
                          <AbstractNodeData Name="icon_img" ActionTag="-821892920" Tag="852" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" LeftEage="33" RightEage="33" TopEage="33" BottomEage="33" Scale9OriginX="33" Scale9OriginY="33" Scale9Width="34" Scale9Height="34" ctype="ImageViewObjectData">
                            <Size X="72.0000" Y="74.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="37.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <FileData Type="Normal" Path="GameHallUI/portrait_sprite.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_bg" ActionTag="-1113898019" Tag="853" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="-7.2000" RightMargin="-7.2000" TopMargin="48.1600" BottomMargin="-2.1600" LeftEage="34" RightEage="34" TopEage="9" BottomEage="9" Scale9OriginX="34" Scale9OriginY="9" Scale9Width="22" Scale9Height="10" ctype="ImageViewObjectData">
                            <Size X="86.4000" Y="28.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.2000" Y="0.3784" />
                            <FileData Type="Normal" Path="Default/name_bg.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_label" ActionTag="1661962075" Tag="854" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-4.0000" RightMargin="-4.0000" TopMargin="52.6600" BottomMargin="2.3400" IsCustomSize="True" FontSize="14" LabelText="我我我我我我我" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="80.0000" Y="19.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="0.9500" ScaleY="0.9500" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.1111" Y="0.2568" />
                            <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="score" ActionTag="-2018280719" Tag="853" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="12.0000" RightMargin="12.0000" TopMargin="73.0000" BottomMargin="-17.0000" FontSize="16" LabelText="-9999" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="48.0000" Y="18.0000" />
                            <AnchorPoint ScaleX="0.4591" ScaleY="0.6295" />
                            <Position X="34.0375" Y="-5.6689" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="0" G="128" B="0" />
                            <PrePosition X="0.4727" Y="-0.0766" />
                            <PreSize X="0.6667" Y="0.2432" />
                            <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint />
                        <Position X="289.4400" Y="20.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.5400" Y="0.1333" />
                        <PreSize X="0.1343" Y="0.4933" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="player_panel_3" ActionTag="-2127376094" Tag="856" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="407.3600" RightMargin="56.6400" TopMargin="56.0000" BottomMargin="20.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="25" RightEage="25" TopEage="25" BottomEage="25" Scale9OriginX="-25" Scale9OriginY="-25" Scale9Width="50" Scale9Height="50" ctype="PanelObjectData">
                        <Size X="72.0000" Y="74.0000" />
                        <Children>
                          <AbstractNodeData Name="icon_img" ActionTag="-1503251607" Tag="857" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" LeftEage="33" RightEage="33" TopEage="33" BottomEage="33" Scale9OriginX="33" Scale9OriginY="33" Scale9Width="34" Scale9Height="34" ctype="ImageViewObjectData">
                            <Size X="72.0000" Y="74.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="37.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.5000" />
                            <PreSize X="1.0000" Y="1.0000" />
                            <FileData Type="Normal" Path="GameHallUI/portrait_sprite.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_bg" ActionTag="1044621452" Tag="852" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="-7.2000" RightMargin="-7.2000" TopMargin="48.1600" BottomMargin="-2.1600" LeftEage="34" RightEage="34" TopEage="9" BottomEage="9" Scale9OriginX="34" Scale9OriginY="9" Scale9Width="22" Scale9Height="10" ctype="ImageViewObjectData">
                            <Size X="86.4000" Y="28.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.2000" Y="0.3784" />
                            <FileData Type="Normal" Path="Default/name_bg.png" Plist="" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="name_label" ActionTag="1032407316" Tag="859" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-4.0000" RightMargin="-4.0000" TopMargin="52.6600" BottomMargin="2.3400" IsCustomSize="True" FontSize="14" LabelText="我我我我我我我" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="80.0000" Y="19.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="11.8400" />
                            <Scale ScaleX="0.9500" ScaleY="0.9500" />
                            <CColor A="255" R="255" G="255" B="255" />
                            <PrePosition X="0.5000" Y="0.1600" />
                            <PreSize X="1.1111" Y="0.2568" />
                            <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                          <AbstractNodeData Name="score" ActionTag="-1400712420" Tag="858" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="12.0000" RightMargin="12.0000" TopMargin="73.0000" BottomMargin="-17.0000" FontSize="16" LabelText="-9999" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                            <Size X="48.0000" Y="18.0000" />
                            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                            <Position X="36.0000" Y="-8.0000" />
                            <Scale ScaleX="1.0000" ScaleY="1.0000" />
                            <CColor A="255" R="0" G="128" B="0" />
                            <PrePosition X="0.5000" Y="-0.1081" />
                            <PreSize X="0.6667" Y="0.2432" />
                            <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                            <OutlineColor A="255" R="255" G="0" B="0" />
                            <ShadowColor A="255" R="110" G="110" B="110" />
                          </AbstractNodeData>
                        </Children>
                        <AnchorPoint />
                        <Position X="407.3600" Y="20.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="255" G="255" B="255" />
                        <PrePosition X="0.7600" Y="0.1333" />
                        <PreSize X="0.1343" Y="0.4933" />
                        <SingleColor A="255" R="150" G="200" B="255" />
                        <FirstColor A="255" R="150" G="200" B="255" />
                        <EndColor A="255" R="255" G="255" B="255" />
                        <ColorVector ScaleY="1.0000" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="room_detail_label" ActionTag="1796560992" Tag="861" IconVisible="False" LeftMargin="16.1351" RightMargin="159.8649" TopMargin="34.9995" BottomMargin="95.0005" IsCustomSize="True" FontSize="16" LabelText="普通麻将，无封顶，摸1宝" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="360.0000" Y="20.0000" />
                        <AnchorPoint ScaleY="0.5000" />
                        <Position X="16.1351" Y="105.0005" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="165" G="115" B="77" />
                        <PrePosition X="0.0301" Y="0.7000" />
                        <PreSize X="0.6716" Y="0.1333" />
                        <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="game_name" ActionTag="-2125932625" Tag="862" IconVisible="False" LeftMargin="12.5000" RightMargin="432.5000" TopMargin="5.5000" BottomMargin="119.5000" FontSize="22" LabelText="贵溪麻将 " VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="91.0000" Y="25.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="58.0000" Y="132.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="237" G="251" B="220" />
                        <PrePosition X="0.1082" Y="0.8800" />
                        <PreSize X="0.1698" Y="0.1667" />
                        <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="room_id_label" ActionTag="-1721937905" Tag="863" IconVisible="False" LeftMargin="113.0000" RightMargin="299.0000" TopMargin="5.5000" BottomMargin="119.5000" FontSize="22" LabelText="房号:888888" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="124.0000" Y="25.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="175.0000" Y="132.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="237" G="251" B="220" />
                        <PrePosition X="0.3265" Y="0.8800" />
                        <PreSize X="0.2313" Y="0.1667" />
                        <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="round_label" ActionTag="68283621" Tag="864" IconVisible="False" LeftMargin="248.0000" RightMargin="244.0000" TopMargin="5.5000" BottomMargin="119.5000" FontSize="22" LabelText="16局" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="44.0000" Y="25.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="270.0000" Y="132.0000" />
                        <Scale ScaleX="1.0610" ScaleY="1.0000" />
                        <CColor A="255" R="237" G="251" B="220" />
                        <PrePosition X="0.5037" Y="0.8800" />
                        <PreSize X="0.0821" Y="0.1667" />
                        <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                      <AbstractNodeData Name="time_label" ActionTag="1663449936" Tag="865" IconVisible="False" LeftMargin="319.0000" RightMargin="35.0000" TopMargin="6.5000" BottomMargin="120.5000" IsCustomSize="True" FontSize="20" LabelText="2017-12-12 23:59:59   " HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                        <Size X="182.0000" Y="23.0000" />
                        <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                        <Position X="410.0000" Y="132.0000" />
                        <Scale ScaleX="1.0000" ScaleY="1.0000" />
                        <CColor A="255" R="0" G="128" B="0" />
                        <PrePosition X="0.7649" Y="0.8800" />
                        <PreSize X="0.3396" Y="0.1533" />
                        <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                        <OutlineColor A="255" R="255" G="0" B="0" />
                        <ShadowColor A="255" R="110" G="110" B="110" />
                      </AbstractNodeData>
                    </Children>
                    <AnchorPoint />
                    <Position />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition />
                    <PreSize X="1.0113" Y="0.2799" />
                    <SingleColor A="255" R="150" G="200" B="255" />
                    <FirstColor A="255" R="150" G="200" B="255" />
                    <EndColor A="255" R="255" G="255" B="255" />
                    <ColorVector ScaleY="1.0000" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint />
                <Position X="48.5500" Y="25.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0379" Y="0.0347" />
                <PreSize X="0.4141" Y="0.7444" />
                <SingleColor A="255" R="255" G="150" B="100" />
                <FirstColor A="255" R="255" G="150" B="100" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
                <InnerNodeSize Width="530" Height="536" />
              </AbstractNodeData>
              <AbstractNodeData Name="refresh_btn" ActionTag="1615289017" Tag="1414" IconVisible="False" LeftMargin="519.0000" RightMargin="709.0000" TopMargin="94.0000" BottomMargin="574.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="22" Scale9Height="30" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="52.0000" Y="52.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="545.0000" Y="600.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4258" Y="0.8333" />
                <PreSize X="0.0406" Y="0.0722" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="Normal" Path="CreateAgentRoomUI/refresh_btn.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="1.0000" Y="1.0000" />
            <FileData Type="Normal" Path="CreateAgentRoomUI/bg_panel.png" Plist="" />
            <SingleColor A="255" R="0" G="0" B="0" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>