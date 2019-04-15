<GameFile>
  <PropertyGroup Name="ClubUI" Type="Layer" ID="2d20b635-3bb8-470b-86ef-915b09b675d7" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="ClubUI" Tag="33" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="bg_panel" ActionTag="1665831591" Tag="87" IconVisible="False" PercentWidthEnable="True" PercentHeightEnable="True" PercentWidthEnabled="True" PercentHeightEnabled="True" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="1280.0000" Y="720.0000" />
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="1.0000" Y="1.0000" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="bg_img" ActionTag="1122456783" Tag="38" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftEage="422" RightEage="422" TopEage="237" BottomEage="237" Scale9OriginX="422" Scale9OriginY="237" Scale9Width="436" Scale9Height="246" ctype="ImageViewObjectData">
            <Size X="1280.0000" Y="720.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="360.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="1.0000" Y="1.0000" />
            <FileData Type="Normal" Path="ClubUI/club_bg.png" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="top_panel" ActionTag="-782253223" Tag="35" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" BottomMargin="610.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="1280.0000" Y="110.0000" />
            <Children>
              <AbstractNodeData Name="bg_img" ActionTag="1469169633" Tag="308" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" BottomMargin="-14.0000" Scale9Enable="True" LeftEage="600" RightEage="600" TopEage="40" BottomEage="40" Scale9OriginX="600" Scale9OriginY="40" Scale9Width="80" Scale9Height="44" ctype="ImageViewObjectData">
                <Size X="1280.0000" Y="124.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
                <Position X="640.0000" Y="110.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="1.0000" />
                <PreSize X="1.0000" Y="1.1273" />
                <FileData Type="Normal" Path="ClubUI/club_top_board.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="head_panel" ActionTag="-377297148" Tag="39" IconVisible="False" RightMargin="980.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="300.0000" Y="110.0000" />
                <Children>
                  <AbstractNodeData Name="head_img" ActionTag="2117722424" Tag="40" IconVisible="False" RightMargin="188.0000" TopMargin="-0.5000" BottomMargin="-0.5000" LeftEage="36" RightEage="36" TopEage="36" BottomEage="36" Scale9OriginX="36" Scale9OriginY="36" Scale9Width="40" Scale9Height="39" ctype="ImageViewObjectData">
                    <Size X="112.0000" Y="111.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="56.0000" Y="55.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.1867" Y="0.5000" />
                    <PreSize X="0.3733" Y="1.0091" />
                    <FileData Type="MarkedSubImage" Path="ClubUI/club_head_bg.png" Plist="ClubUI.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="name_label" ActionTag="-1189027767" Tag="42" IconVisible="False" LeftMargin="130.0000" RightMargin="27.0000" TopMargin="8.0949" BottomMargin="78.9051" FontSize="20" LabelText="名字最长七个字" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="143.0000" Y="23.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="130.0000" Y="90.4051" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="223" G="213" B="186" />
                    <PrePosition X="0.4333" Y="0.8219" />
                    <PreSize X="0.4767" Y="0.2091" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="user_id_label" ActionTag="1063841453" Tag="43" IconVisible="False" LeftMargin="130.0000" RightMargin="31.0000" TopMargin="35.8442" BottomMargin="47.1558" FontSize="24" LabelText="ID:123456789" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="139.0000" Y="27.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="130.0000" Y="60.6558" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.4333" Y="0.5514" />
                    <PreSize X="0.4633" Y="0.2455" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleY="1.0000" />
                <Position Y="110.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition Y="1.0000" />
                <PreSize X="0.2344" Y="1.0000" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="club_name_panel" ActionTag="-1381127212" Tag="44" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="460.0000" RightMargin="460.0000" BottomMargin="40.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="360.0000" Y="70.0000" />
                <Children>
                  <AbstractNodeData Name="title_img" ActionTag="1647483542" Tag="309" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-11.0000" RightMargin="-11.0000" BottomMargin="-14.0000" LeftEage="126" RightEage="126" TopEage="27" BottomEage="27" Scale9OriginX="126" Scale9OriginY="27" Scale9Width="130" Scale9Height="30" ctype="ImageViewObjectData">
                    <Size X="382.0000" Y="84.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
                    <Position X="180.0000" Y="70.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="1.0000" />
                    <PreSize X="1.0611" Y="1.2000" />
                    <FileData Type="MarkedSubImage" Path="ClubUI/club_title_bg.png" Plist="ClubUI.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="club_name_label" ActionTag="-1766029345" Tag="46" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="28.5000" RightMargin="28.5000" TopMargin="18.0000" BottomMargin="18.0000" IsCustomSize="True" FontSize="30" LabelText="俱乐部名字最长十个字" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="303.0000" Y="34.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="180.0000" Y="35.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="151" G="70" B="40" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="0.8417" Y="0.4857" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
                <Position X="640.0000" Y="110.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="1.0000" />
                <PreSize X="0.2813" Y="0.6364" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="card_panel" ActionTag="-1477250547" VisibleForFrame="False" Tag="47" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="880.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="400.0000" Y="110.0000" />
                <Children>
                  <AbstractNodeData Name="Image_3" ActionTag="-1955304417" Tag="48" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="20.0000" RightMargin="216.0000" TopMargin="13.2000" BottomMargin="52.8000" LeftEage="54" RightEage="54" TopEage="14" BottomEage="14" Scale9OriginX="54" Scale9OriginY="14" Scale9Width="56" Scale9Height="16" ctype="ImageViewObjectData">
                    <Size X="164.0000" Y="44.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position X="20.0000" Y="74.8000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.0500" Y="0.6800" />
                    <PreSize X="0.4100" Y="0.4000" />
                    <FileData Type="MarkedSubImage" Path="ClubUI/clug_cards_bg.png" Plist="ClubUI.plist" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="Image_4" ActionTag="-1594854758" Tag="49" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" RightMargin="334.0000" TopMargin="13.2000" BottomMargin="52.8000" LeftEage="21" RightEage="21" TopEage="14" BottomEage="14" Scale9OriginX="21" Scale9OriginY="14" Scale9Width="24" Scale9Height="16" ctype="ImageViewObjectData">
                    <Size X="66.0000" Y="44.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position Y="74.8000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition Y="0.6800" />
                    <PreSize X="0.1650" Y="0.4000" />
                    <FileData Type="Normal" Path="GameHallUI/card.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="card_label" ActionTag="1785793266" Tag="50" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="78.0000" RightMargin="254.0000" TopMargin="24.2500" BottomMargin="62.7500" FontSize="20" LabelText="999999" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="68.0000" Y="23.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="112.0000" Y="74.2500" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.2800" Y="0.6750" />
                    <PreSize X="0.1700" Y="0.2091" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="1.0000" ScaleY="1.0000" />
                <Position X="1280.0000" Y="110.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="1.0000" Y="1.0000" />
                <PreSize X="0.3125" Y="1.0000" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
              <AbstractNodeData Name="back_btn" ActionTag="1236169648" Tag="51" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="1184.8000" RightMargin="27.2000" TopMargin="5.5000" BottomMargin="40.5000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="38" Scale9Height="42" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="68.0000" Y="64.0000" />
                <AnchorPoint ScaleX="1.4000" ScaleY="1.0000" />
                <Position X="1280.0000" Y="104.5000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="1.0000" Y="0.9500" />
                <PreSize X="0.0531" Y="0.5818" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="MarkedSubImage" Path="ClubUI/club_back.png" Plist="ClubUI.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="id_panel" ActionTag="158082451" Tag="263" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="516.0000" RightMargin="516.0000" TopMargin="80.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="248.0000" Y="30.0000" />
                <Children>
                  <AbstractNodeData Name="Image_1" ActionTag="1659611535" Tag="264" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftEage="81" RightEage="81" TopEage="9" BottomEage="9" Scale9OriginX="81" Scale9OriginY="9" Scale9Width="86" Scale9Height="12" ctype="ImageViewObjectData">
                    <Size X="248.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="124.0000" Y="15.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="1.0000" Y="1.0000" />
                    <FileData Type="Normal" Path="ClubUI/club_id_bg.png" Plist="" />
                  </AbstractNodeData>
                  <AbstractNodeData Name="club_id_label" ActionTag="1267475634" Tag="265" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="-1.0000" RightMargin="-1.0000" TopMargin="-2.0000" BottomMargin="-2.0000" IsCustomSize="True" FontSize="30" LabelText="" HorizontalAlignmentType="HT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="250.0000" Y="34.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="124.0000" Y="15.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.5000" Y="0.5000" />
                    <PreSize X="1.0081" Y="1.1333" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="640.0000" Y="15.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.1364" />
                <PreSize X="0.1937" Y="0.2727" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
            <Position X="640.0000" Y="720.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="1.0000" />
            <PreSize X="1.0000" Y="0.1528" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="room_panel" ActionTag="66889328" Tag="41" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" TopMargin="171.0000" BottomMargin="99.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="1280.0000" Y="450.0000" />
            <Children>
              <AbstractNodeData Name="desk_0" ActionTag="428676291" Tag="78" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="70.0160" RightMargin="969.9840" TopMargin="-5.0000" BottomMargin="225.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                <Size X="240.0000" Y="230.0000" />
                <AnchorPoint />
                <Position X="70.0160" Y="225.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0547" Y="0.5000" />
                <PreSize X="0.1875" Y="0.5111" />
                <FileData Type="Normal" Path="DeskUI.csd" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="desk_1" ActionTag="893193465" Tag="87" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="370.0480" RightMargin="669.9520" TopMargin="-5.0000" BottomMargin="225.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                <Size X="240.0000" Y="230.0000" />
                <AnchorPoint />
                <Position X="370.0480" Y="225.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2891" Y="0.5000" />
                <PreSize X="0.1875" Y="0.5111" />
                <FileData Type="Normal" Path="DeskUI.csd" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="desk_2" ActionTag="167104966" Tag="92" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="669.9520" RightMargin="370.0480" TopMargin="-5.0000" BottomMargin="225.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                <Size X="240.0000" Y="230.0000" />
                <AnchorPoint />
                <Position X="669.9520" Y="225.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5234" Y="0.5000" />
                <PreSize X="0.1875" Y="0.5111" />
                <FileData Type="Normal" Path="DeskUI.csd" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="desk_3" ActionTag="149037448" Tag="97" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="969.9840" RightMargin="70.0160" TopMargin="-5.0000" BottomMargin="225.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                <Size X="240.0000" Y="230.0000" />
                <AnchorPoint />
                <Position X="969.9840" Y="225.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7578" Y="0.5000" />
                <PreSize X="0.1875" Y="0.5111" />
                <FileData Type="Normal" Path="DeskUI.csd" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="desk_4" ActionTag="-104525183" Tag="102" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="40.0640" RightMargin="999.9360" TopMargin="220.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                <Size X="240.0000" Y="230.0000" />
                <AnchorPoint />
                <Position X="40.0640" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0313" />
                <PreSize X="0.1875" Y="0.5111" />
                <FileData Type="Normal" Path="DeskUI.csd" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="desk_5" ActionTag="-716228726" Tag="107" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="360.0640" RightMargin="679.9360" TopMargin="220.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                <Size X="240.0000" Y="230.0000" />
                <AnchorPoint />
                <Position X="360.0640" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2813" />
                <PreSize X="0.1875" Y="0.5111" />
                <FileData Type="Normal" Path="DeskUI.csd" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="desk_6" ActionTag="-1320471902" Tag="112" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="680.0640" RightMargin="359.9360" TopMargin="220.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                <Size X="240.0000" Y="230.0000" />
                <AnchorPoint />
                <Position X="680.0640" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5313" />
                <PreSize X="0.1875" Y="0.5111" />
                <FileData Type="Normal" Path="DeskUI.csd" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="desk_7" ActionTag="-2099404937" Tag="117" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="1000.0640" RightMargin="39.9360" TopMargin="220.0000" StretchWidthEnable="False" StretchHeightEnable="False" InnerActionSpeed="1.0000" CustomSizeEnabled="False" ctype="ProjectNodeObjectData">
                <Size X="240.0000" Y="230.0000" />
                <AnchorPoint />
                <Position X="1000.0640" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7813" />
                <PreSize X="0.1875" Y="0.5111" />
                <FileData Type="Normal" Path="DeskUI.csd" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="640.0000" Y="324.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.4500" />
            <PreSize X="1.0000" Y="0.6250" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="bottom_panel" ActionTag="1111118709" Tag="36" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" TopMargin="636.0000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="1280.0000" Y="84.0000" />
            <Children>
              <AbstractNodeData Name="bg_img" ActionTag="899567806" Tag="307" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" TopMargin="-8.0000" LeftEage="422" RightEage="422" TopEage="30" BottomEage="30" Scale9OriginX="422" Scale9OriginY="30" Scale9Width="436" Scale9Height="32" ctype="ImageViewObjectData">
                <Size X="1280.0000" Y="92.0000" />
                <AnchorPoint ScaleX="0.5000" />
                <Position X="640.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" />
                <PreSize X="1.0000" Y="1.0952" />
                <FileData Type="Normal" Path="ClubUI/club_bottom_board.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="Image_8" ActionTag="414158022" Tag="68" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="62.4000" RightMargin="1137.6000" TopMargin="1.0000" BottomMargin="1.0000" Scale9Width="80" Scale9Height="82" ctype="ImageViewObjectData">
                <Size X="80.0000" Y="82.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="102.4000" Y="42.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0800" Y="0.5000" />
                <PreSize X="0.0625" Y="0.9762" />
                <FileData Type="MarkedSubImage" Path="ClubUI/club_bottom_bg.png" Plist="ClubUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="Image_9" ActionTag="-629022097" Tag="69" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="318.4000" RightMargin="881.6000" TopMargin="1.0000" BottomMargin="1.0000" Scale9Width="80" Scale9Height="82" ctype="ImageViewObjectData">
                <Size X="80.0000" Y="82.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="358.4000" Y="42.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.2800" Y="0.5000" />
                <PreSize X="0.0625" Y="0.9762" />
                <FileData Type="MarkedSubImage" Path="ClubUI/club_bottom_bg.png" Plist="ClubUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="Image_10" ActionTag="-993963020" Tag="70" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="574.4000" RightMargin="625.6000" TopMargin="1.0000" BottomMargin="1.0000" Scale9Width="80" Scale9Height="82" ctype="ImageViewObjectData">
                <Size X="80.0000" Y="82.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="614.4000" Y="42.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4800" Y="0.5000" />
                <PreSize X="0.0625" Y="0.9762" />
                <FileData Type="MarkedSubImage" Path="ClubUI/club_bottom_bg.png" Plist="ClubUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="Image_11" ActionTag="1036000130" Tag="71" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="830.4000" RightMargin="369.6000" TopMargin="1.0000" BottomMargin="1.0000" Scale9Width="80" Scale9Height="82" ctype="ImageViewObjectData">
                <Size X="80.0000" Y="82.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="870.4000" Y="42.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6800" Y="0.5000" />
                <PreSize X="0.0625" Y="0.9762" />
                <FileData Type="MarkedSubImage" Path="ClubUI/club_bottom_bg.png" Plist="ClubUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="Image_12" ActionTag="-671969795" Tag="72" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="1086.4000" RightMargin="113.6000" TopMargin="1.0000" BottomMargin="1.0000" Scale9Width="80" Scale9Height="82" ctype="ImageViewObjectData">
                <Size X="80.0000" Y="82.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="1126.4000" Y="42.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8800" Y="0.5000" />
                <PreSize X="0.0625" Y="0.9762" />
                <FileData Type="MarkedSubImage" Path="ClubUI/club_bottom_bg.png" Plist="ClubUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="setting_btn" ActionTag="-1997569898" Tag="62" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="61.0000" RightMargin="1085.0000" TopMargin="7.0000" BottomMargin="7.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="104" Scale9Height="48" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="134.0000" Y="70.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="128.0000" Y="42.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1000" Y="0.5000" />
                <PreSize X="0.1047" Y="0.8333" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="MarkedSubImage" Path="ClubUI/club_bottom_setting.png" Plist="ClubUI.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="mgr_btn" ActionTag="633901117" VisibleForFrame="False" Tag="63" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="61.0000" RightMargin="1085.0000" TopMargin="7.0000" BottomMargin="7.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="104" Scale9Height="48" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="134.0000" Y="70.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="128.0000" Y="42.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.1000" Y="0.5000" />
                <PreSize X="0.1047" Y="0.8333" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="MarkedSubImage" Path="ClubUI/club_bottom_mgr.png" Plist="ClubUI.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="mem_btn" ActionTag="468221988" Tag="64" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="317.0000" RightMargin="829.0000" TopMargin="7.0000" BottomMargin="7.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="104" Scale9Height="48" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="134.0000" Y="70.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="384.0000" Y="42.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3000" Y="0.5000" />
                <PreSize X="0.1047" Y="0.8333" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="MarkedSubImage" Path="ClubUI/club_bottom_mem.png" Plist="ClubUI.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="record_btn" ActionTag="-270183468" Tag="65" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="573.0000" RightMargin="573.0000" TopMargin="7.0000" BottomMargin="7.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="104" Scale9Height="48" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="134.0000" Y="70.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="640.0000" Y="42.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.1047" Y="0.8333" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="MarkedSubImage" Path="ClubUI/club_bottom_record.png" Plist="ClubUI.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="play_btn" ActionTag="909040657" Tag="66" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="829.0000" RightMargin="317.0000" TopMargin="7.0000" BottomMargin="7.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="104" Scale9Height="48" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="134.0000" Y="70.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="896.0000" Y="42.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.7000" Y="0.5000" />
                <PreSize X="0.1047" Y="0.8333" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="MarkedSubImage" Path="ClubUI/club_bottom_instruction.png" Plist="ClubUI.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="share_btn" ActionTag="-1988295451" Tag="67" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="1085.0000" RightMargin="61.0000" TopMargin="7.0000" BottomMargin="7.0000" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="104" Scale9Height="48" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="134.0000" Y="70.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="1152.0000" Y="42.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9000" Y="0.5000" />
                <PreSize X="0.1047" Y="0.8333" />
                <TextColor A="255" R="65" G="65" B="70" />
                <NormalFileData Type="MarkedSubImage" Path="ClubUI/club_bottom_share.png" Plist="ClubUI.plist" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" />
            <Position X="640.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" />
            <PreSize X="1.0000" Y="0.1167" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="broadcast_panel" ActionTag="1490449508" VisibleForFrame="False" Tag="304" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" TopMargin="108.0000" BottomMargin="562.0000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="1280.0000" Y="50.0000" />
            <Children>
              <AbstractNodeData Name="bg_img" ActionTag="786853400" Tag="305" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="385.0000" RightMargin="385.0000" TopMargin="5.0000" BottomMargin="5.0000" Scale9Enable="True" LeftEage="2" RightEage="2" TopEage="18" BottomEage="18" Scale9OriginX="2" Scale9OriginY="18" Scale9Width="684" Scale9Height="4" ctype="ImageViewObjectData">
                <Size X="510.0000" Y="40.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="640.0000" Y="25.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.3984" Y="0.8000" />
                <FileData Type="Normal" Path="Default/broadcast_bg.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="broadcast_img" ActionTag="892437651" Tag="306" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="388.9120" RightMargin="857.0880" TopMargin="9.3300" BottomMargin="12.6700" LeftEage="13" RightEage="13" TopEage="13" BottomEage="13" Scale9OriginX="13" Scale9OriginY="13" Scale9Width="8" Scale9Height="2" ctype="ImageViewObjectData">
                <Size X="34.0000" Y="28.0000" />
                <AnchorPoint ScaleX="1.0000" ScaleY="0.5000" />
                <Position X="422.9120" Y="26.6700" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3304" Y="0.5334" />
                <PreSize X="0.0266" Y="0.5600" />
                <FileData Type="Normal" Path="Default/bugle.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="label_panel" ActionTag="833733327" Tag="307" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" PercentWidthEnable="True" PercentWidthEnabled="True" LeftMargin="435.7120" RightMargin="396.2880" TopMargin="-1.6700" BottomMargin="1.6700" ClipAble="True" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
                <Size X="448.0000" Y="50.0000" />
                <Children>
                  <AbstractNodeData Name="broadcast_label" ActionTag="2055361003" Tag="308" IconVisible="False" PositionPercentYEnabled="True" RightMargin="-68.0000" TopMargin="12.5000" BottomMargin="12.5000" FontSize="22" LabelText="欢迎加入俱乐部，本俱乐部提倡健康娱乐，严禁赌博！" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="516.0000" Y="25.0000" />
                    <AnchorPoint ScaleY="0.5000" />
                    <Position Y="25.0000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition Y="0.5000" />
                    <PreSize X="1.1518" Y="0.5000" />
                    <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleY="0.5000" />
                <Position X="435.7120" Y="26.6700" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3404" Y="0.5334" />
                <PreSize X="0.3500" Y="1.0000" />
                <SingleColor A="255" R="150" G="200" B="255" />
                <FirstColor A="255" R="150" G="200" B="255" />
                <EndColor A="255" R="255" G="255" B="255" />
                <ColorVector ScaleY="1.0000" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="1.0000" />
            <Position X="640.0000" Y="612.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.8500" />
            <PreSize X="1.0000" Y="0.0694" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>