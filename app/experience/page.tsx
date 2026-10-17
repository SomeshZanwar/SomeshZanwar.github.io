import type { Metadata } from "next";
import Row from "@/components/Row";
import { education, experience, skills } from "@/lib/content";

export const metadata: Metadata = { title: "Experience", description: "Work history, education, and the tools I use with the project where I used each." };

export default function Experience() {
  return (
    <>
      <section className="cs-head">
        <p className="mono">Experience</p>
        <h1 style={{ marginTop: ".8rem" }}>Where the habits came from</h1>
      </section>

      <Row label="Work">
        {experience.map((e) => (
          <div key={e.org}>
            <h2>{e.role}</h2>
            <p className="mono plain">{e.org} · {e.place} · {e.period}</p>
            <p className="note-box" style={{ margin: "1rem 0" }}>{e.note}</p>
            <ul className="plainlist">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}
      </Row>

      <Row label="Education">
        {education.map((e) => (
          <div className="item-block" key={e.school}>
            <h3>{e.degree}</h3>
            <span className="mono plain">{e.school} · {e.period}</span>
            <p>{e.detail}</p>
          </div>
        ))}
      </Row>

      <Row label="Tools" sub="Listed with where I used them" wide>
        <table className="skilltable">
          <tbody>
            {skills.map((s) => (
              <tr key={s.area}>
                <td>{s.area}<span className="it">{s.items}</span></td>
                <td>{s.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
    </>
  );
}
