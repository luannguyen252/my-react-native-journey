import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import SoundButton from "./components/SoundButton";
import Header from "./components/Header";

export default function ReactNativeSoundboard() {
  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <Header text={"MEME SOUNDBOARD"} />
      <SoundButton
        soundBite={require("./assets/sound/animeWow.mp3")}
        title="Anime Wow"
      />
      <SoundButton
        soundBite={require("./assets/sound/babobe.mp3")}
        title="Scatman Ba Bo Be"
      />
      <SoundButton
        soundBite={require("./assets/sound/bruh.mp3")}
        title="Bruh"
      />
      <SoundButton
        soundBite={require("./assets/sound/deezNuts.mp3")}
        title="Deez Nuts"
      />
      <SoundButton
        soundBite={require("./assets/sound/godAnime.mp3")}
        title="I Have The Power of God and Anime"
      />
      <SoundButton
        soundBite={require("./assets/sound/illuminati.mp3")}
        title="Illuminati"
      />
      <SoundButton
        soundBite={require("./assets/sound/justDoIt.mp3")}
        title="Just Do It"
      />
      <SoundButton
        soundBite={require("./assets/sound/leeroyJenkins.mp3")}
        title="Leeroy Jenkins"
      />
      <SoundButton
        soundBite={require("./assets/sound/minecraftOof.mp3")}
        title="Minecraft Oof"
      />
      <SoundButton
        soundBite={require("./assets/sound/mlgHorns.mp3")}
        title="MLG Horns"
      />
      <SoundButton
        soundBite={require("./assets/sound/nootNoot.mp3")}
        title="Noot Noot"
      />
      <SoundButton
        soundBite={require("./assets/sound/ohBabyATriple.mp3")}
        title="Oh Baby a Triple"
      />
      <SoundButton
        soundBite={require("./assets/sound/shotsFired.mp3")}
        title="Shots Fired"
      />
      <SoundButton
        soundBite={require("./assets/sound/shrekSwamp.mp3")}
        title="What Are You Doing In My Swamp"
      />
      <SoundButton
        soundBite={require("./assets/sound/thatWasLegitness.mp3")}
        title="That Was Legitness"
      />
      <SoundButton
        soundBite={require("./assets/sound/thisIsSparta.mp3")}
        title="This is Sparta"
      />
      <SoundButton
        soundBite={require("./assets/sound/wasted.mp3")}
        title="GTA V Wasted"
      />
      <SoundButton
        soundBite={require("./assets/sound/whatAreThose.mp3")}
        title="What Are Those"
      />
      <SoundButton
        soundBite={require("./assets/sound/womboCombo.mp3")}
        title="Wombo Combo"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
