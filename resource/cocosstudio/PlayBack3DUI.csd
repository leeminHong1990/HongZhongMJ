<GameFile>
  <PropertyGroup Name="PlayBack3DUI" Type="Layer" ID="c6e7533a-1ec3-458c-b0c8-3d85d8d34f91" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Layer" Tag="183" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="room_info_panel" ActionTag="1573799319" Tag="751" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="439.9360" RightMargin="440.0640" TopMargin="220.0000" BottomMargin="450.0000" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" LeftEage="69" RightEage="69" TopEage="10" BottomEage="10" Scale9OriginX="-69" Scale9OriginY="-10" Scale9Width="138" Scale9Height="20" ctype="PanelObjectData">
            <Size X="400.0000" Y="50.0000" />
            <Children>
              <AbstractNodeData Name="label_bg" ActionTag="-917742354" Alpha="204" Tag="752" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="95.0000" RightMargin="95.0000" TopMargin="9.0000" BottomMargin="9.0000" LeftEage="69" RightEage="69" TopEage="10" BottomEage="10" Scale9OriginX="69" Scale9OriginY="10" Scale9Width="72" Scale9Height="12" ctype="ImageViewObjectData">
                <Size X="210.0000" Y="32.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="200.0000" Y="25.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="0.5250" Y="0.6400" />
                <FileData Type="Normal" Path="Default/label_bg.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="rate_label" ActionTag="-1154363229" Tag="753" IconVisible="False" LeftMargin="109.4071" RightMargin="164.5929" TopMargin="11.3694" BottomMargin="11.6306" FontSize="24" LabelText="进度：2/191 " VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="126.0000" Y="27.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="172.4071" Y="25.1306" />
                <Scale ScaleX="0.7500" ScaleY="0.7500" />
                <CColor A="255" R="116" G="215" B="205" />
                <PrePosition X="0.4310" Y="0.5026" />
                <PreSize X="0.3150" Y="0.5400" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="speed_label" ActionTag="-326442593" Tag="754" IconVisible="False" LeftMargin="219.2538" RightMargin="110.7462" TopMargin="11.3512" BottomMargin="11.6488" FontSize="24" LabelText=" 4倍速" HorizontalAlignmentType="HT_Right" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="70.0000" Y="27.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="254.2538" Y="25.1488" />
                <Scale ScaleX="0.7500" ScaleY="0.7500" />
                <CColor A="255" R="249" G="219" B="8" />
                <PrePosition X="0.6356" Y="0.5030" />
                <PreSize X="0.1750" Y="0.5400" />
                <FontResource Type="Normal" Path="font/zhunyuan.ttf" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" />
            <Position X="639.9360" Y="450.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.4999" Y="0.6250" />
            <PreSize X="0.3125" Y="0.0694" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="player_operation_panel0" ActionTag="260526146" VisibleForFrame="False" Tag="184" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="391.6000" RightMargin="468.4000" TopMargin="524.4000" BottomMargin="135.6000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="420.0000" Y="60.0000" />
            <Children>
              <AbstractNodeData Name="pong_chk" ActionTag="1255922239" Tag="66" IconVisible="False" LeftMargin="100.0000" RightMargin="268.0000" TopMargin="12.9790" BottomMargin="-0.9790" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="126.0000" Y="23.0210" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3000" Y="0.3837" />
                <PreSize X="0.1238" Y="0.8000" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pong_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pong_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/pong_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="kong_chk" ActionTag="1407270995" Tag="67" IconVisible="False" LeftMargin="180.0000" RightMargin="188.0000" TopMargin="12.9790" BottomMargin="-0.9790" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="206.0000" Y="23.0210" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4905" Y="0.3837" />
                <PreSize X="0.1238" Y="0.8000" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/kong_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/kong_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/kong_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="win_chk" ActionTag="-2122442184" Tag="68" IconVisible="False" LeftMargin="260.0000" RightMargin="108.0000" TopMargin="12.9790" BottomMargin="-0.9790" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="286.0000" Y="23.0210" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6810" Y="0.3837" />
                <PreSize X="0.1238" Y="0.8000" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/win_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/win_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/win_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="pass_chk" ActionTag="-75092130" Tag="69" IconVisible="False" LeftMargin="339.9999" RightMargin="28.0001" TopMargin="12.9790" BottomMargin="-0.9790" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="365.9999" Y="23.0210" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8714" Y="0.3837" />
                <PreSize X="0.1238" Y="0.8000" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pass_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pass_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/pass_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="601.6000" Y="165.6000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.4700" Y="0.2300" />
            <PreSize X="0.3281" Y="0.0833" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="player_operation_panel1" ActionTag="-1280614833" VisibleForFrame="False" Tag="1475" RotationSkewX="-12.9654" RotationSkewY="-12.9489" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="1023.9520" RightMargin="196.0480" TopMargin="82.6080" BottomMargin="217.3920" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="60.0000" Y="420.0000" />
            <Children>
              <AbstractNodeData Name="pong_chk" ActionTag="-1113676571" Tag="61" IconVisible="False" LeftMargin="1.9491" RightMargin="6.0509" TopMargin="103.0000" BottomMargin="269.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="27.9491" Y="293.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4658" Y="0.6976" />
                <PreSize X="0.8667" Y="0.1143" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pong_r_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pong_r_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/pong_r_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="kong_chk" ActionTag="1746534120" Tag="62" IconVisible="False" LeftMargin="0.3534" RightMargin="7.6466" TopMargin="183.0000" BottomMargin="189.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="26.3534" Y="213.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4392" Y="0.5071" />
                <PreSize X="0.8667" Y="0.1143" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/kong_r_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/kong_r_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/kong_r_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="win_chk" ActionTag="82581692" Tag="63" IconVisible="False" LeftMargin="3.5442" RightMargin="4.4558" TopMargin="263.0000" BottomMargin="109.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="29.5442" Y="133.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4924" Y="0.3167" />
                <PreSize X="0.8667" Y="0.1143" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/win_r_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/win_r_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/win_r_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="pass_chk" ActionTag="52319630" Tag="64" IconVisible="False" LeftMargin="1.9491" RightMargin="6.0509" TopMargin="343.0000" BottomMargin="29.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="27.9491" Y="53.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4658" Y="0.1262" />
                <PreSize X="0.8667" Y="0.1143" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pass_r_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pass_r_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/pass_r_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="1053.9520" Y="427.3920" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.8234" Y="0.5936" />
            <PreSize X="0.0469" Y="0.5833" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="player_operation_panel2" ActionTag="-761530772" VisibleForFrame="False" Tag="70" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="391.6000" RightMargin="468.4000" TopMargin="81.0960" BottomMargin="578.9040" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="420.0000" Y="60.0000" />
            <Children>
              <AbstractNodeData Name="pong_chk" ActionTag="-1925752331" Tag="72" IconVisible="False" LeftMargin="100.0000" RightMargin="268.0000" TopMargin="12.9790" BottomMargin="-0.9790" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="126.0000" Y="23.0210" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3000" Y="0.3837" />
                <PreSize X="0.1238" Y="0.8000" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pong_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pong_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/pong_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="kong_chk" ActionTag="-707456041" Tag="73" IconVisible="False" LeftMargin="180.0000" RightMargin="188.0000" TopMargin="12.9790" BottomMargin="-0.9790" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="206.0000" Y="23.0210" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4905" Y="0.3837" />
                <PreSize X="0.1238" Y="0.8000" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/kong_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/kong_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/kong_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="win_chk" ActionTag="-101090178" Tag="74" IconVisible="False" LeftMargin="260.0000" RightMargin="108.0000" TopMargin="12.9790" BottomMargin="-0.9790" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="286.0000" Y="23.0210" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.6810" Y="0.3837" />
                <PreSize X="0.1238" Y="0.8000" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/win_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/win_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/win_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="pass_chk" ActionTag="-710547193" Tag="75" IconVisible="False" LeftMargin="339.9999" RightMargin="28.0001" TopMargin="12.9790" BottomMargin="-0.9790" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="365.9999" Y="23.0210" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.8714" Y="0.3837" />
                <PreSize X="0.1238" Y="0.8000" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pass_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pass_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/pass_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="601.6000" Y="608.9040" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.4700" Y="0.8457" />
            <PreSize X="0.3281" Y="0.0833" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="player_operation_panel3" ActionTag="443443310" VisibleForFrame="False" Tag="76" RotationSkewX="13.8051" RotationSkewY="13.8068" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="182.2240" RightMargin="1037.7760" TopMargin="85.2000" BottomMargin="214.8000" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="60.0000" Y="420.0000" />
            <Children>
              <AbstractNodeData Name="pong_chk" ActionTag="-969952863" Tag="78" IconVisible="False" LeftMargin="1.9491" RightMargin="6.0509" TopMargin="103.0000" BottomMargin="269.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="27.9491" Y="293.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4658" Y="0.6976" />
                <PreSize X="0.8667" Y="0.1143" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pong_l_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pong_l_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/pong_l_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="kong_chk" ActionTag="-2081700667" Tag="79" IconVisible="False" LeftMargin="0.3534" RightMargin="7.6466" TopMargin="183.0000" BottomMargin="189.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="26.3534" Y="213.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4392" Y="0.5071" />
                <PreSize X="0.8667" Y="0.1143" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/kong_l_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/kong_l_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/kong_l_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="win_chk" ActionTag="645903828" Tag="80" IconVisible="False" LeftMargin="3.5442" RightMargin="4.4558" TopMargin="263.0000" BottomMargin="109.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="29.5442" Y="133.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4924" Y="0.3167" />
                <PreSize X="0.8667" Y="0.1143" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/win_l_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/win_l_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/win_l_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
              <AbstractNodeData Name="pass_chk" ActionTag="-2111118945" Tag="81" IconVisible="False" LeftMargin="1.9491" RightMargin="6.0509" TopMargin="343.0000" BottomMargin="29.0000" TouchEnable="True" ctype="CheckBoxObjectData">
                <Size X="52.0000" Y="48.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="27.9491" Y="53.0000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.4658" Y="0.1262" />
                <PreSize X="0.8667" Y="0.1143" />
                <NormalBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pass_l_n.png" Plist="PlaybackUI.plist" />
                <PressedBackFileData Type="MarkedSubImage" Path="PlayBack3DUI/pass_l_s.png" Plist="PlaybackUI.plist" />
                <NodeNormalFileData Type="MarkedSubImage" Path="PlayBack3DUI/pass_l_s.png" Plist="PlaybackUI.plist" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="212.2240" Y="424.8000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.1658" Y="0.5900" />
            <PreSize X="0.0469" Y="0.5833" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="finger_img" ActionTag="-574708197" Tag="82" IconVisible="False" LeftMargin="-179.3012" RightMargin="1385.3011" TopMargin="530.5042" BottomMargin="111.4958" ctype="SpriteObjectData">
            <Size X="74.0000" Y="78.0000" />
            <AnchorPoint ScaleY="1.0000" />
            <Position X="-179.3012" Y="189.4958" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="-0.1401" Y="0.2632" />
            <PreSize X="0.0578" Y="0.1083" />
            <FileData Type="MarkedSubImage" Path="PlayBack2DUI/finger.png" Plist="PlaybackUI.plist" />
            <BlendFunc Src="1" Dst="771" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>