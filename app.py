from __future__ import annotations

import os

from flask import Flask, render_template, request, jsonify, send_file

from resume_data import (
    NAME,
    ROLE,
    TAGLINE,
    EMAIL,
    PHONE,
    GITHUB_URL,
    LINKEDIN_URL,
    WHATSAPP_URL,
    LOCATION,
    AVATAR_URL,
    SOCIAL_LINKS,
    SUMMARY,
    EDUCATION,
    SKILLS,
    FEATURED_PROJECTS,
    GITHUB_REPOS,
    ACHIEVEMENTS,
    CERTIFICATIONS,
    STATS,
    build_resume_markdown,
)
import io

app = Flask(__name__)


@app.route("/")
def home():
    return render_template(
        "index.html",
        name=NAME,
        role=ROLE,
        tagline=TAGLINE,
        email=EMAIL,
        phone=PHONE,
        github=GITHUB_URL,
        linkedin=LINKEDIN_URL,
        whatsapp=WHATSAPP_URL,
        location=LOCATION,
        avatar=AVATAR_URL,
        social_links=SOCIAL_LINKS,
        summary=SUMMARY,
        education=EDUCATION,
        skills=SKILLS,
        featured_projects=FEATURED_PROJECTS,
        github_repos=GITHUB_REPOS,
        achievements=ACHIEVEMENTS,
        certifications=CERTIFICATIONS,
        stats=STATS,
    )


@app.route("/resume")
def resume():
    return render_template(
        "resume.html",
        name=NAME,
        role=ROLE,
        email=EMAIL,
        phone=PHONE,
        github=GITHUB_URL,
        linkedin=LINKEDIN_URL,
        whatsapp=WHATSAPP_URL,
        location=LOCATION,
        avatar=AVATAR_URL,
        summary=SUMMARY,
        education=EDUCATION,
        skills=SKILLS,
        projects=FEATURED_PROJECTS,
        achievements=ACHIEVEMENTS,
        certifications=CERTIFICATIONS,
    )



@app.route("/contact", methods=["POST"])
def contact():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({"success": False, "error": "All fields are required."}), 400

    return jsonify({"success": True, "message": "Thank you! Your message has been received."})


@app.route("/download-resume")
def download_resume():
    resume_md = build_resume_markdown()
    return send_file(
        io.BytesIO(resume_md.encode("utf-8")),
        mimetype="text/markdown",
        as_attachment=True,
        download_name="Vansh_Srivastava_Resume.md",
    )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
