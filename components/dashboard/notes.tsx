"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";

interface Note {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
}

export default function Notes({ userId }: { userId: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch notes");
      return;
    }

    setNotes(data || []);
  }

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!newNote.trim()) return;

    const { error } = await supabase.from("notes").insert([
      {
        content: newNote,
        user_id: userId,
      },
    ]);

    if (error) {
      toast.error("Failed to add note");
      return;
    }

    setNewNote("");
    fetchNotes();
  }

  async function deleteNote(noteId: string) {
    const { error } = await supabase.from("notes").delete().eq("id", noteId);

    if (error) {
      toast.error("Failed to delete note");
      return;
    }

    fetchNotes();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={addNote} className="space-y-4">
        <Textarea
          placeholder="Write your note here..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={4}
        />
        <Button type="submit">Save Note</Button>
      </form>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-4 rounded-lg border space-y-2"
          >
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground">
                {format(new Date(note.created_at), "PPP")}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </Button>
            </div>
            <p className="whitespace-pre-wrap">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}