// Registers ChaiBuilder's built-in blocks (Box, Heading, Paragraph, Image, Link, …).
// Imported by both the server config and the editor so they agree on the block set.
import { loadWebBlocks } from "@chaibuilder/core/web-blocks";

loadWebBlocks();
