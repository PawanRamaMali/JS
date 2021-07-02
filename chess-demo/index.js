var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};
console.clear();
var PIECE_DIR_CALC = 0;
var Utils = /** @class */ (function () {
  function Utils() {
  }
  Utils.colToInt = function (col) {
      return Board.COLS.indexOf(col);
  };
  Utils.rowToInt = function (row) {
      return Board.ROWS.indexOf(row);
  };
  Utils.intToCol = function (int) {
      return Board.COLS[int];
  };
  Utils.intToRow = function (int) {
      return Board.ROWS[int];
  };
  Utils.getPositionsFromShortCode = function (shortCode) {
      var positions = Utils.getInitialPiecePositions();
      var overrides = {};
      var defaultPositionMode = shortCode.charAt(0) === "X";
      if (defaultPositionMode) {
          shortCode = shortCode.slice(1);
      }
      shortCode.split(",").forEach(function (string) {
          var promoted = string.charAt(0) === "P";
          if (promoted) {
              string = string.slice(1);
          }
          if (defaultPositionMode) {
              var inactive = string.length === 3;
              var id = string.slice(0, 2);
              var col = inactive ? undefined : string.charAt(2);
              var row = inactive ? undefined : string.charAt(3);
              var moves = string.charAt(4) || "1";
              overrides[id] = {
                  col: col,
                  row: row,
                  active: !inactive,
                  _moves: parseInt(moves),
                  _promoted: promoted,
              };
          }
          else {
              var moved = string.length >= 4;
              var id = string.slice(0, 2);
              var col = string.charAt(moved ? 2 : 0);
              var row = string.charAt(moved ? 3 : 1);
              var moves = string.charAt(4) || moved ? "1" : "0";
              overrides[id] = { col: col, row: row, active: true, _moves: parseInt(moves), _promoted: promoted };
          }
      });
      for (var id in positions) {
          if (overrides[id]) {
              positions[id] = overrides[id];
          }
          else {
              positions[id] = defaultPositionMode ? positions[id] : { active: false };
          }
      }
      return positions;
  };
  Utils.getInitialBoardPieces = function (parent, pieces) {
      var boardPieces = {};
      var container = document.createElement("div");
      container.className = "pieces";
      parent.appendChild(container);
      for (var pieceId in pieces) {
          var boardPiece = document.createElement("div");
          boardPiece.className = "piece " + pieces[pieceId].data.player.toLowerCase();
          boardPiece.innerHTML = pieces[pieceId].shape();
          container.appendChild(boardPiece);
          boardPieces[pieceId] = boardPiece;
      }
      return boardPieces;
  };
  Utils.getInitialBoardTiles = function (parent, handler) {
      var tiles = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {} };
      var board = document.createElement("div");
      board.className = "board";
      parent.appendChild(board);
      for (var i = 0; i < 8; i++) {
          var row = document.createElement("div");
          row.className = "row";
          board.appendChild(row);
          var _loop_1 = function (j) {
              var tile = document.createElement("button");
              tile.className = "tile";
              var r = Utils.intToRow(i);
              var c = Utils.intToCol(j);
              tile.addEventListener("click", function () { return handler({ row: r, col: c }); });
              row.appendChild(tile);
              tiles[r][c] = tile;
          };
          for (var j = 0; j < 8; j++) {
              _loop_1(j);
          }
      }
      return tiles;
  };
  Utils.getInitialBoardState = function (construct) {
      if (construct === void 0) { construct = function () { return undefined; }; }
      var blankRow = function () { return ({
          A: construct(),
          B: construct(),
          C: construct(),
          D: construct(),
          E: construct(),
          F: construct(),
          G: construct(),
          H: construct(),
      }); };
      return {
          1: __assign({}, blankRow()),
          2: __assign({}, blankRow()),
          3: __assign({}, blankRow()),
          4: __assign({}, blankRow()),
          5: __assign({}, blankRow()),
          6: __assign({}, blankRow()),
          7: __assign({}, blankRow()),
          8: __assign({}, blankRow()),
      };
  };
  Utils.getInitialPiecePositions = function () {
      return {
          A8: { active: true, row: "8", col: "A" },
          B8: { active: true, row: "8", col: "B" },
          C8: { active: true, row: "8", col: "C" },
          D8: { active: true, row: "8", col: "D" },
          E8: { active: true, row: "8", col: "E" },
          F8: { active: true, row: "8", col: "F" },
          G8: { active: true, row: "8", col: "G" },
          H8: { active: true, row: "8", col: "H" },
          A7: { active: true, row: "7", col: "A" },
          B7: { active: true, row: "7", col: "B" },
          C7: { active: true, row: "7", col: "C" },
          D7: { active: true, row: "7", col: "D" },
          E7: { active: true, row: "7", col: "E" },
          F7: { active: true, row: "7", col: "F" },
          G7: { active: true, row: "7", col: "G" },
          H7: { active: true, row: "7", col: "H" },
          A2: { active: true, row: "2", col: "A" },
          B2: { active: true, row: "2", col: "B" },
          C2: { active: true, row: "2", col: "C" },
          D2: { active: true, row: "2", col: "D" },
          E2: { active: true, row: "2", col: "E" },
          F2: { active: true, row: "2", col: "F" },
          G2: { active: true, row: "2", col: "G" },
          H2: { active: true, row: "2", col: "H" },
          A1: { active: true, row: "1", col: "A" },
          B1: { active: true, row: "1", col: "B" },
          C1: { active: true, row: "1", col: "C" },
          D1: { active: true, row: "1", col: "D" },
          E1: { active: true, row: "1", col: "E" },
          F1: { active: true, row: "1", col: "F" },
          G1: { active: true, row: "1", col: "G" },
          H1: { active: true, row: "1", col: "H" },
      };
  };
  Utils.getInitialPieces = function () {
      return {
          A8: new Piece({ id: "A8", player: "BLACK", type: "ROOK" }),
          B8: new Piece({ id: "B8", player: "BLACK", type: "KNIGHT" }),
          C8: new Piece({ id: "C8", player: "BLACK", type: "BISHOP" }),
          D8: new Piece({ id: "D8", player: "BLACK", type: "QUEEN" }),
          E8: new Piece({ id: "E8", player: "BLACK", type: "KING" }),
          F8: new Piece({ id: "F8", player: "BLACK", type: "BISHOP" }),
          G8: new Piece({ id: "G8", player: "BLACK", type: "KNIGHT" }),
          H8: new Piece({ id: "H8", player: "BLACK", type: "ROOK" }),
          A7: new Piece({ id: "A7", player: "BLACK", type: "PAWN" }),
          B7: new Piece({ id: "B7", player: "BLACK", type: "PAWN" }),
          C7: new Piece({ id: "C7", player: "BLACK", type: "PAWN" }),
          D7: new Piece({ id: "D7", player: "BLACK", type: "PAWN" }),
          E7: new Piece({ id: "E7", player: "BLACK", type: "PAWN" }),
          F7: new Piece({ id: "F7", player: "BLACK", type: "PAWN" }),
          G7: new Piece({ id: "G7", player: "BLACK", type: "PAWN" }),
          H7: new Piece({ id: "H7", player: "BLACK", type: "PAWN" }),
          A2: new Piece({ id: "A2", player: "WHITE", type: "PAWN" }),
          B2: new Piece({ id: "B2", player: "WHITE", type: "PAWN" }),
          C2: new Piece({ id: "C2", player: "WHITE", type: "PAWN" }),
          D2: new Piece({ id: "D2", player: "WHITE", type: "PAWN" }),
          E2: new Piece({ id: "E2", player: "WHITE", type: "PAWN" }),
          F2: new Piece({ id: "F2", player: "WHITE", type: "PAWN" }),
          G2: new Piece({ id: "G2", player: "WHITE", type: "PAWN" }),
          H2: new Piece({ id: "H2", player: "WHITE", type: "PAWN" }),
          A1: new Piece({ id: "A1", player: "WHITE", type: "ROOK" }),
          B1: new Piece({ id: "B1", player: "WHITE", type: "KNIGHT" }),
          C1: new Piece({ id: "C1", player: "WHITE", type: "BISHOP" }),
          D1: new Piece({ id: "D1", player: "WHITE", type: "QUEEN" }),
          E1: new Piece({ id: "E1", player: "WHITE", type: "KING" }),
          F1: new Piece({ id: "F1", player: "WHITE", type: "BISHOP" }),
          G1: new Piece({ id: "G1", player: "WHITE", type: "KNIGHT" }),
          H1: new Piece({ id: "H1", player: "WHITE", type: "ROOK" }),
      };
  };
  return Utils;
}());
var Shape = /** @class */ (function () {
  function Shape() {
  }
  Shape.shape = function (player, piece) {
      return "<svg class=\"" + player + "\" width=\"170\" height=\"170\" viewBox=\"0 0 170 170\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <use href=\"#" + piece + "\" />\n    </svg>";
  };
  Shape.shapeBishop = function (player) {
      return Shape.shape(player, "bishop");
  };
  Shape.shapeKing = function (player) {
      return Shape.shape(player, "king");
  };
  Shape.shapeKnight = function (player) {
      return Shape.shape(player, "knight");
  };
  Shape.shapePawn = function (player) {
      return Shape.shape(player, "pawn");
  };
  Shape.shapeQueen = function (player) {
      return Shape.shape(player, "queen");
  };
  Shape.shapeRook = function (player) {
      return Shape.shape(player, "rook");
  };
  return Shape;
}());
var Constraints = /** @class */ (function () {
  function Constraints() {
  }
  Constraints.generate = function (args, resultingChecks) {
      var method;
      var piecePositions = args.piecePositions, piece = args.piece;
      if (piecePositions[piece.data.id].active) {
          switch (piece.data.type) {
              case "BISHOP":
                  method = Constraints.constraintsBishop;
                  break;
              case "KING":
                  method = Constraints.constraintsKing;
                  break;
              case "KNIGHT":
                  method = Constraints.constraintsKnight;
                  break;
              case "PAWN":
                  method = Constraints.constraintsPawn;
                  break;
              case "QUEEN":
                  method = Constraints.constraintsQueen;
                  break;
              case "ROOK":
                  method = Constraints.constraintsRook;
                  break;
          }
      }
      var result = method ? method(args) : { moves: [], captures: [] };
      if (resultingChecks) {
          var moveIndex_1 = args.moveIndex + 1;
          result.moves = result.moves.filter(function (location) { return !resultingChecks({ piece: piece, location: location, capture: false, moveIndex: moveIndex_1 }).length; });
          result.captures = result.captures.filter(function (location) { return !resultingChecks({ piece: piece, location: location, capture: true, moveIndex: moveIndex_1 }).length; });
      }
      return result;
  };
  Constraints.constraintsBishop = function (args) {
      return Constraints.constraintsDiagonal(args);
  };
  Constraints.constraintsDiagonal = function (args) {
      var response = { moves: [], captures: [] };
      var piece = args.piece;
      Constraints.runUntil(piece.dirNW.bind(piece), response, args);
      Constraints.runUntil(piece.dirNE.bind(piece), response, args);
      Constraints.runUntil(piece.dirSW.bind(piece), response, args);
      Constraints.runUntil(piece.dirSE.bind(piece), response, args);
      return response;
  };
  Constraints.constraintsKing = function (args) {
      var piece = args.piece, kingCastles = args.kingCastles, piecePositions = args.piecePositions;
      var moves = [];
      var captures = [];
      var locations = [
          piece.dirN(1, piecePositions),
          piece.dirNE(1, piecePositions),
          piece.dirE(1, piecePositions),
          piece.dirSE(1, piecePositions),
          piece.dirS(1, piecePositions),
          piece.dirSW(1, piecePositions),
          piece.dirW(1, piecePositions),
          piece.dirNW(1, piecePositions),
      ];
      if (kingCastles) {
          var castles = kingCastles(piece);
          castles.forEach(function (position) { return moves.push(position); });
      }
      locations.forEach(function (location) {
          var value = Constraints.relationshipToTile(location, args);
          if (value === "BLANK") {
              moves.push(location);
          }
          else if (value === "ENEMY") {
              captures.push(location);
          }
      });
      return { moves: moves, captures: captures };
  };
  Constraints.constraintsKnight = function (args) {
      var piece = args.piece, piecePositions = args.piecePositions;
      var moves = [];
      var captures = [];
      var locations = [
          piece.dir(1, 2, piecePositions),
          piece.dir(1, -2, piecePositions),
          piece.dir(2, 1, piecePositions),
          piece.dir(2, -1, piecePositions),
          piece.dir(-1, 2, piecePositions),
          piece.dir(-1, -2, piecePositions),
          piece.dir(-2, 1, piecePositions),
          piece.dir(-2, -1, piecePositions),
      ];
      locations.forEach(function (location) {
          var value = Constraints.relationshipToTile(location, args);
          if (value === "BLANK") {
              moves.push(location);
          }
          else if (value === "ENEMY") {
              captures.push(location);
          }
      });
      return { moves: moves, captures: captures };
  };
  Constraints.constraintsOrthangonal = function (args) {
      var piece = args.piece;
      var response = { moves: [], captures: [] };
      Constraints.runUntil(piece.dirN.bind(piece), response, args);
      Constraints.runUntil(piece.dirE.bind(piece), response, args);
      Constraints.runUntil(piece.dirS.bind(piece), response, args);
      Constraints.runUntil(piece.dirW.bind(piece), response, args);
      return response;
  };
  Constraints.constraintsPawn = function (args) {
      var piece = args.piece, piecePositions = args.piecePositions;
      var moves = [];
      var captures = [];
      var locationN1 = piece.dirN(1, piecePositions);
      var locationN2 = piece.dirN(2, piecePositions);
      if (Constraints.relationshipToTile(locationN1, args) === "BLANK") {
          moves.push(locationN1);
          if (!piece.moves.length && Constraints.relationshipToTile(locationN2, args) === "BLANK") {
              moves.push(locationN2);
          }
      }
      [
          [piece.dirNW(1, piecePositions), piece.dirW(1, piecePositions)],
          [piece.dirNE(1, piecePositions), piece.dirE(1, piecePositions)],
      ].forEach(function (_a) {
          var location = _a[0], enPassant = _a[1];
          var standardCaptureRelationship = Constraints.relationshipToTile(location, args);
          var enPassantCaptureRelationship = Constraints.relationshipToTile(enPassant, args);
          if (standardCaptureRelationship === "ENEMY") {
              captures.push(location);
          }
          else if (piece.moves.length > 0 && enPassantCaptureRelationship === "ENEMY") {
              var enPassantRow = enPassant.row === (piece.playerWhite() ? "5" : "4");
              var other = Constraints.locationToPiece(enPassant, args);
              if (enPassantRow && other && other.data.type === "PAWN") {
                  if (other.moves.length === 1 && other.moves[0] === args.moveIndex - 1) {
                      location.capture = __assign({}, enPassant);
                      captures.push(location);
                  }
              }
          }
      });
      return { moves: moves, captures: captures };
  };
  Constraints.constraintsQueen = function (args) {
      var diagonal = Constraints.constraintsDiagonal(args);
      var orthagonal = Constraints.constraintsOrthangonal(args);
      return {
          moves: diagonal.moves.concat(orthagonal.moves),
          captures: diagonal.captures.concat(orthagonal.captures),
      };
  };
  Constraints.constraintsRook = function (args) {
      return Constraints.constraintsOrthangonal(args);
  };
  Constraints.locationToPiece = function (location, args) {
      if (!location) {
          return undefined;
      }
      var state = args.state, pieces = args.pieces;
      var row = state[location.row];
      var occupyingId = row === undefined ? undefined : row[location.col];
      return pieces[occupyingId];
  };
  Constraints.relationshipToTile = function (location, args) {
      if (!location) {
          return undefined;
      }
      var piece = args.piece;
      var occupying = Constraints.locationToPiece(location, args);
      if (occupying) {
          return occupying.data.player === piece.data.player ? "FRIEND" : "ENEMY";
      }
      else {
          return "BLANK";
      }
  };
  Constraints.runUntil = function (locationFunction, response, args) {
      var piecePositions = args.piecePositions;
      var inc = 1;
      var location = locationFunction(inc++, piecePositions);
      while (location) {
          var abort = false;
          var relations = Constraints.relationshipToTile(location, args);
          if (relations === "ENEMY") {
              response.captures.push(location);
              abort = true;
          }
          else if (relations === "FRIEND") {
              abort = true;
          }
          else {
              response.moves.push(location);
          }
          if (abort) {
              location = undefined;
          }
          else {
              location = locationFunction(inc++, piecePositions);
          }
      }
  };
  return Constraints;
}());
var Piece = /** @class */ (function () {
  function Piece(data) {
      this.moves = [];
      this.promoted = false;
      this.updateShape = false;
      this.data = data;
  }
  Object.defineProperty(Piece.prototype, "orientation", {
      get: function () {
          return this.data.player === "BLACK" ? -1 : 1;
      },
      enumerable: false,
      configurable: true
  });
  Piece.prototype.dirN = function (steps, positions) {
      return this.dir(steps, 0, positions);
  };
  Piece.prototype.dirS = function (steps, positions) {
      return this.dir(-steps, 0, positions);
  };
  Piece.prototype.dirW = function (steps, positions) {
      return this.dir(0, -steps, positions);
  };
  Piece.prototype.dirE = function (steps, positions) {
      return this.dir(0, steps, positions);
  };
  Piece.prototype.dirNW = function (steps, positions) {
      return this.dir(steps, -steps, positions);
  };
  Piece.prototype.dirNE = function (steps, positions) {
      return this.dir(steps, steps, positions);
  };
  Piece.prototype.dirSW = function (steps, positions) {
      return this.dir(-steps, -steps, positions);
  };
  Piece.prototype.dirSE = function (steps, positions) {
      return this.dir(-steps, steps, positions);
  };
  Piece.prototype.dir = function (stepsRow, stepsColumn, positions) {
      PIECE_DIR_CALC++;
      var row = Utils.rowToInt(positions[this.data.id].row) + this.orientation * stepsRow;
      var col = Utils.colToInt(positions[this.data.id].col) + this.orientation * stepsColumn;
      if (row >= 0 && row <= 7 && col >= 0 && col <= 7) {
          return { row: Utils.intToRow(row), col: Utils.intToCol(col) };
      }
      return undefined;
  };
  Piece.prototype.move = function (moveIndex) {
      this.moves.push(moveIndex);
  };
  Piece.prototype.options = function (moveIndex, state, pieces, piecePositions, resultingChecks, kingCastles) {
      return Constraints.generate({ moveIndex: moveIndex, state: state, piece: this, pieces: pieces, piecePositions: piecePositions, kingCastles: kingCastles }, resultingChecks);
  };
  Piece.prototype.playerBlack = function () {
      return this.data.player === "BLACK";
  };
  Piece.prototype.playerWhite = function () {
      return this.data.player === "WHITE";
  };
  Piece.prototype.promote = function (type) {
      if (type === void 0) { type = "QUEEN"; }
      this.data.type = type;
      this.promoted = true;
      this.updateShape = true;
  };
  Piece.prototype.shape = function () {
      var player = this.data.player.toLowerCase();
      switch (this.data.type) {
          case "BISHOP":
              return Shape.shapeBishop(player);
          case "KING":
              return Shape.shapeKing(player);
          case "KNIGHT":
              return Shape.shapeKnight(player);
          case "PAWN":
              return Shape.shapePawn(player);
          case "QUEEN":
              return Shape.shapeQueen(player);
          case "ROOK":
              return Shape.shapeRook(player);
      }
  };
  return Piece;
}());
var Board = /** @class */ (function () {
  function Board(pieces, piecePositions) {
      this.checksBlack = [];
      this.checksWhite = [];
      this.piecesTilesCaptures = {};
      this.piecesTilesMoves = {};
      this.tilesPiecesBlackCaptures = Utils.getInitialBoardState(function () { return []; });
      this.tilesPiecesBlackMoves = Utils.getInitialBoardState(function () { return []; });
      this.tilesPiecesWhiteCaptures = Utils.getInitialBoardState(function () { return []; });
      this.tilesPiecesWhiteMoves = Utils.getInitialBoardState(function () { return []; });
      this.pieceIdsBlack = [];
      this.pieceIdsWhite = [];
      this.state = Utils.getInitialBoardState();
      this.pieces = pieces;
      for (var id in pieces) {
          if (pieces[id].playerWhite()) {
              this.pieceIdsWhite.push(id);
          }
          else {
              this.pieceIdsBlack.push(id);
          }
      }
      this.initializePositions(piecePositions);
  }
  Board.prototype.initializePositions = function (piecePositions) {
      this.piecePositions = piecePositions;
      this.initializeState();
      this.piecesUpdate(0);
  };
  Board.prototype.initializeState = function () {
      for (var pieceId in this.pieces) {
          var _a = this.piecePositions[pieceId], row = _a.row, col = _a.col, active = _a.active, _moves = _a._moves, _promoted = _a._promoted;
          if (_moves) {
              delete this.piecePositions[pieceId]._moves;
              // TODO: come back to this
              // this.pieces[pieceId].moves = new Array(_moves);
          }
          if (_promoted) {
              delete this.piecePositions[pieceId]._promoted;
              this.pieces[pieceId].promote();
          }
          if (active) {
              this.state[row] = this.state[row] || [];
              this.state[row][col] = pieceId;
          }
      }
  };
  Board.prototype.kingCastles = function (king) {
      var _this = this;
      var castles = [];
      // king has to not have moved
      if (king.moves.length) {
          return castles;
      }
      var kingIsWhite = king.playerWhite();
      var moves = kingIsWhite ? this.tilesPiecesBlackMoves : this.tilesPiecesWhiteMoves;
      var checkPositions = function (row, rookCol, castles) {
          var cols = rookCol === "A" ? ["D", "C", "B"] : ["F", "G"];
          // rook has to not have moved
          var rookId = "" + rookCol + row;
          var rook = _this.pieces[rookId];
          var active = _this.piecePositions[rookId].active;
          if (active && rook.moves.length === 0) {
              var canCastle_1 = true;
              cols.forEach(function (col) {
                  // each tile has to be empty
                  if (_this.state[row][col]) {
                      canCastle_1 = false;
                      // each tile cant be in the path of the other team
                  }
                  else if (moves[row][col].length) {
                      canCastle_1 = false;
                  }
              });
              if (canCastle_1) {
                  castles.push({ col: cols[1], row: row, castles: rookCol });
              }
          }
      };
      var row = kingIsWhite ? "1" : "8";
      if (!this.pieces["A" + row].moves.length) {
          checkPositions(row, "A", castles);
      }
      if (!this.pieces["H" + row].moves.length) {
          checkPositions(row, "H", castles);
      }
      return castles;
  };
  Board.prototype.kingCheckStates = function (kingPosition, captures, piecePositions) {
      var col = kingPosition.col, row = kingPosition.row;
      return captures[row][col].map(function (id) { return piecePositions[id]; }).filter(function (pos) { return pos.active; });
  };
  Board.prototype.pieceCalculateMoves = function (pieceId, moveIndex, state, piecePositions, piecesTilesCaptures, piecesTilesMoves, tilesPiecesCaptures, tilesPiecesMoves, resultingChecks, kingCastles) {
      var _a = this.pieces[pieceId].options(moveIndex, state, this.pieces, piecePositions, resultingChecks, kingCastles), captures = _a.captures, moves = _a.moves;
      piecesTilesCaptures[pieceId] = Array.from(captures);
      piecesTilesMoves[pieceId] = Array.from(moves);
      captures.forEach(function (_a) {
          var col = _a.col, row = _a.row;
          return tilesPiecesCaptures[row][col].push(pieceId);
      });
      moves.forEach(function (_a) {
          var col = _a.col, row = _a.row;
          return tilesPiecesMoves[row][col].push(pieceId);
      });
  };
  Board.prototype.pieceCapture = function (piece) {
      var pieceId = piece.data.id;
      var _a = this.piecePositions[pieceId], col = _a.col, row = _a.row;
      this.state[row][col] = undefined;
      delete this.piecePositions[pieceId].col;
      delete this.piecePositions[pieceId].row;
      this.piecePositions[pieceId].active = false;
  };
  Board.prototype.pieceMove = function (piece, location) {
      var pieceId = piece.data.id;
      var _a = this.piecePositions[pieceId], row = _a.row, col = _a.col;
      this.state[row][col] = undefined;
      this.state[location.row][location.col] = pieceId;
      this.piecePositions[pieceId].row = location.row;
      this.piecePositions[pieceId].col = location.col;
      if (piece.data.type === "PAWN" && (location.row === "8" || location.row === "1")) {
          piece.promote();
      }
  };
  Board.prototype.piecesUpdate = function (moveIndex) {
      var _this = this;
      this.tilesPiecesBlackCaptures = Utils.getInitialBoardState(function () { return []; });
      this.tilesPiecesBlackMoves = Utils.getInitialBoardState(function () { return []; });
      this.tilesPiecesWhiteCaptures = Utils.getInitialBoardState(function () { return []; });
      this.tilesPiecesWhiteMoves = Utils.getInitialBoardState(function () { return []; });
      this.pieceIdsBlack.forEach(function (id) {
          return _this.pieceCalculateMoves(id, moveIndex, _this.state, _this.piecePositions, _this.piecesTilesCaptures, _this.piecesTilesMoves, _this.tilesPiecesBlackCaptures, _this.tilesPiecesBlackMoves, _this.resultingChecks.bind(_this), _this.kingCastles.bind(_this));
      });
      this.pieceIdsWhite.forEach(function (id) {
          return _this.pieceCalculateMoves(id, moveIndex, _this.state, _this.piecePositions, _this.piecesTilesCaptures, _this.piecesTilesMoves, _this.tilesPiecesWhiteCaptures, _this.tilesPiecesWhiteMoves, _this.resultingChecks.bind(_this), _this.kingCastles.bind(_this));
      });
      this.checksBlack = this.kingCheckStates(this.piecePositions.E1, this.tilesPiecesBlackCaptures, this.piecePositions);
      this.checksWhite = this.kingCheckStates(this.piecePositions.E8, this.tilesPiecesWhiteCaptures, this.piecePositions);
  };
  Board.prototype.resultingChecks = function (_a) {
      var _this = this;
      var piece = _a.piece, location = _a.location, capture = _a.capture, moveIndex = _a.moveIndex;
      var tilesPiecesCaptures = Utils.getInitialBoardState(function () { return []; });
      var tilesPiecesMoves = Utils.getInitialBoardState(function () { return []; });
      var piecesTilesCaptures = {};
      var piecesTilesMoves = {};
      var state = JSON.parse(JSON.stringify(this.state));
      var piecePositions = JSON.parse(JSON.stringify(this.piecePositions));
      if (capture) {
          var loc = location.capture || location;
          var capturedId = state[loc.row][loc.col];
          if (this.pieces[capturedId].data.type === "KING") {
              // this is a checking move
          }
          else {
              delete piecePositions[capturedId].col;
              delete piecePositions[capturedId].row;
              piecePositions[capturedId].active = false;
          }
      }
      var pieceId = piece.data.id;
      var _b = piecePositions[pieceId], row = _b.row, col = _b.col;
      state[row][col] = undefined;
      state[location.row][location.col] = pieceId;
      piecePositions[pieceId].row = location.row;
      piecePositions[pieceId].col = location.col;
      var ids = piece.playerWhite() ? this.pieceIdsBlack : this.pieceIdsWhite;
      var king = piece.playerWhite() ? piecePositions.E1 : piecePositions.E8;
      ids.forEach(function (id) {
          return _this.pieceCalculateMoves(id, moveIndex, state, piecePositions, piecesTilesCaptures, piecesTilesMoves, tilesPiecesCaptures, tilesPiecesMoves);
      });
      return this.kingCheckStates(king, tilesPiecesCaptures, piecePositions);
  };
  Board.prototype.tileEach = function (callback) {
      var _this = this;
      Board.ROWS.forEach(function (row) {
          Board.COLS.forEach(function (col) {
              var piece = _this.tileFind({ row: row, col: col });
              var moves = piece ? _this.piecesTilesMoves[piece.data.id] : undefined;
              var captures = piece ? _this.piecesTilesCaptures[piece.data.id] : undefined;
              callback({ row: row, col: col }, piece, moves, captures);
          });
      });
  };
  Board.prototype.tileFind = function (_a) {
      var row = _a.row, col = _a.col;
      var id = this.state[row][col];
      return this.pieces[id];
  };
  Board.prototype.toShortCode = function () {
      var positionsAbsolute = [];
      var positionsDefaults = [];
      for (var id in this.piecePositions) {
          var _a = this.piecePositions[id], active = _a.active, col = _a.col, row = _a.row;
          var pos = "" + col + row;
          var moves = this.pieces[id].moves;
          var promotedCode = this.pieces[id].promoted ? "P" : "";
          var movesCode = moves > 9 ? "9" : moves > 1 ? moves.toString() : "";
          if (active) {
              positionsAbsolute.push("" + promotedCode + id + (id === pos ? "" : pos) + movesCode);
              if (id !== pos || moves > 0) {
                  positionsDefaults.push("" + promotedCode + id + pos + movesCode);
              }
          }
          else {
              if (id !== "BQ" && id !== "WQ") {
                  positionsDefaults.push("" + promotedCode + id + "X");
              }
          }
      }
      var pA = positionsAbsolute.join(",");
      var pD = positionsDefaults.join(",");
      return pA.length > pD.length ? "X" + pD : pA;
  };
  Board.COLS = ["A", "B", "C", "D", "E", "F", "G", "H"];
  Board.ROWS = ["1", "2", "3", "4", "5", "6", "7", "8"];
  return Board;
}());
var Game = /** @class */ (function () {
  function Game(pieces, piecePositions, turn) {
      if (turn === void 0) { turn = "WHITE"; }
      this.active = null;
      this.activePieceOptions = [];
      this.moveIndex = 0;
      this.moves = [];
      this.turn = turn;
      this.board = new Board(pieces, piecePositions);
  }
  Game.prototype.activate = function (location) {
      var tilePiece = this.board.tileFind(location);
      if (tilePiece && !this.active && tilePiece.data.player !== this.turn) {
          this.active = null;
          return { type: "INVALID" };
          // a piece is active rn
      }
      else if (this.active) {
          var activePieceId = this.active.data.id;
          this.active = null;
          var validatedPosition = this.activePieceOptions.find(function (option) { return option.col === location.col && option.row === location.row; });
          var positionIsValid = !!validatedPosition;
          this.activePieceOptions = [];
          var capturePiece = (validatedPosition === null || validatedPosition === void 0 ? void 0 : validatedPosition.capture) ? this.board.tileFind(validatedPosition.capture) : tilePiece;
          // a piece is on the tile
          if (capturePiece) {
              var capturedPieceId = capturePiece.data.id;
              // cancelling the selected piece on invalid location
              if (capturedPieceId === activePieceId) {
                  return { type: "CANCEL" };
              }
              else if (positionIsValid) {
                  // capturing the selected piece
                  this.capture(activePieceId, capturedPieceId, location);
                  return {
                      type: "CAPTURE",
                      activePieceId: activePieceId,
                      capturedPieceId: capturedPieceId,
                      captures: [location],
                  };
                  // cancel
              }
              else if (capturePiece.data.player !== this.turn) {
                  return { type: "CANCEL" };
              }
              else {
                  // proceed to TOUCH or CANCEL
              }
          }
          else if (positionIsValid) {
              // moving will return castled if that happens (only two move)
              var castledId = this.move(activePieceId, location);
              return { type: "MOVE", activePieceId: activePieceId, moves: [location], castledId: castledId };
              // invalid spot. cancel.
          }
          else {
              return { type: "CANCEL" };
          }
      }
      // no piece selected or new CANCEL + TOUCH
      if (tilePiece) {
          var tilePieceId = tilePiece.data.id;
          var moves = this.board.piecesTilesMoves[tilePieceId];
          var captures = this.board.piecesTilesCaptures[tilePieceId];
          if (!moves.length && !captures.length) {
              return { type: "INVALID" };
          }
          this.active = tilePiece;
          this.activePieceOptions = moves.concat(captures);
          return { type: "TOUCH", captures: captures, moves: moves, activePieceId: tilePieceId };
          // cancelling
      }
      else {
          this.activePieceOptions = [];
          return { type: "CANCEL" };
      }
  };
  Game.prototype.capture = function (capturingPieceId, capturedPieceId, location) {
      var captured = this.board.pieces[capturedPieceId];
      this.board.pieceCapture(captured);
      this.move(capturingPieceId, location, true);
  };
  Game.prototype.handleCastling = function (piece, location) {
      if (piece.data.type !== "KING" ||
          piece.moves.length ||
          location.row !== (piece.playerWhite() ? "1" : "8") ||
          (location.col !== "C" && location.col !== "G")) {
          return;
      }
      return "" + (location.col === "C" ? "A" : "H") + location.row;
  };
  Game.prototype.move = function (pieceId, location, capture) {
      if (capture === void 0) { capture = false; }
      var piece = this.board.pieces[pieceId];
      var castledId = this.handleCastling(piece, location);
      piece.move(this.moveIndex);
      if (castledId) {
          var castled = this.board.pieces[castledId];
          castled.move(this.moveIndex);
          this.board.pieceMove(castled, { col: location.col === "C" ? "D" : "F", row: location.row });
          this.moves.push(pieceId + "O" + location.col + location.row);
      }
      else {
          this.moves.push("" + pieceId + (capture ? "x" : "") + location.col + location.row);
      }
      this.moveIndex++;
      this.board.pieceMove(piece, location);
      this.turn = this.turn === "WHITE" ? "BLACK" : "WHITE";
      this.board.piecesUpdate(this.moveIndex);
      var state = this.moveResultState();
      console.log(state);
      if (!state.moves && !state.captures) {
          alert(state.stalemate ? "Stalemate!" : (this.turn === "WHITE" ? "Black" : "White") + " Wins!");
      }
      return castledId;
  };
  Game.prototype.moveResultState = function () {
      var _this = this;
      var movesWhite = 0;
      var capturesWhite = 0;
      var movesBlack = 0;
      var capturesBlack = 0;
      this.board.tileEach(function (_a) {
          var row = _a.row, col = _a.col;
          movesWhite += _this.board.tilesPiecesWhiteMoves[row][col].length;
          capturesWhite += _this.board.tilesPiecesWhiteCaptures[row][col].length;
          movesBlack += _this.board.tilesPiecesBlackMoves[row][col].length;
          capturesBlack += _this.board.tilesPiecesBlackCaptures[row][col].length;
      });
      var activeBlack = this.board.pieceIdsBlack.filter(function (pieceId) { return _this.board.piecePositions[pieceId].active; }).length;
      var activeWhite = this.board.pieceIdsWhite.filter(function (pieceId) { return _this.board.piecePositions[pieceId].active; }).length;
      var moves = this.turn === "WHITE" ? movesWhite : movesBlack;
      var captures = this.turn === "WHITE" ? capturesWhite : capturesBlack;
      var noMoves = movesWhite + capturesWhite + movesBlack + capturesBlack === 0;
      var checked = !!this.board[this.turn === "WHITE" ? "checksBlack" : "checksWhite"].length;
      var onlyKings = activeBlack === 1 && activeWhite === 1;
      var stalemate = onlyKings || noMoves || ((moves + captures === 0) && !checked);
      var code = this.board.toShortCode();
      return { turn: this.turn, checked: checked, moves: moves, captures: captures, code: code, stalemate: stalemate };
  };
  Game.prototype.randomMove = function () {
      var _this = this;
      if (this.active) {
          if (this.activePieceOptions.length) {
              var _a = this.activePieceOptions[Math.floor(Math.random() * this.activePieceOptions.length)], col = _a.col, row = _a.row;
              return { col: col, row: row };
          }
          else {
              var _b = this.board.piecePositions[this.active.data.id], col = _b.col, row = _b.row;
              return { col: col, row: row };
          }
      }
      else {
          var ids = this.turn === "WHITE" ? this.board.pieceIdsWhite : this.board.pieceIdsBlack;
          var positions = ids.map(function (pieceId) {
              var moves = _this.board.piecesTilesMoves[pieceId];
              var captures = _this.board.piecesTilesCaptures[pieceId];
              return (moves.length || captures.length) ? _this.board.piecePositions[pieceId] : undefined;
          }).filter(function (position) { return position === null || position === void 0 ? void 0 : position.active; });
          var remaining = positions[Math.floor(Math.random() * positions.length)];
          var _c = remaining || { col: "E", row: "1" }, col = _c.col, row = _c.row;
          return { col: col, row: row };
      }
  };
  return Game;
}());
var View = /** @class */ (function () {
  function View(element, game, perspective) {
      this.element = element;
      this.game = game;
      this.setPerspective(perspective || this.game.turn);
      this.tiles = Utils.getInitialBoardTiles(this.element, this.handleTileClick.bind(this));
      this.pieces = Utils.getInitialBoardPieces(this.element, this.game.board.pieces);
      this.drawPiecePositions();
  }
  View.prototype.drawActivePiece = function (activePieceId) {
      var _a = this.game.board.piecePositions[activePieceId], row = _a.row, col = _a.col;
      this.tiles[row][col].classList.add("highlight-active");
      this.pieces[activePieceId].classList.add("highlight-active");
  };
  View.prototype.drawCapturedPiece = function (capturedPieceId) {
      var piece = this.pieces[capturedPieceId];
      piece.style.setProperty("--transition-delay", "var(--transition-duration)");
      piece.style.removeProperty("--pos-col");
      piece.style.removeProperty("--pos-row");
      piece.style.setProperty("--scale", "0");
  };
  View.prototype.drawPiecePositions = function (moves, moveInner) {
      var _this = this;
      if (moves === void 0) { moves = []; }
      if (moveInner === void 0) { moveInner = ""; }
      document.body.style.setProperty("--color-background", "var(--color-" + this.game.turn.toLowerCase());
      var other = this.game.turn === "WHITE" ? "turn-black" : "turn-white";
      var current = this.game.turn === "WHITE" ? "turn-white" : "turn-black";
      this.element.classList.add(current);
      this.element.classList.remove(other);
      if (moves.length) {
          this.element.classList.add("touching");
      }
      else {
          this.element.classList.remove("touching");
      }
      var key = function (row, col) { return row + "-" + col; };
      var moveKeys = moves.map(function (_a) {
          var row = _a.row, col = _a.col;
          return key(row, col);
      });
      this.game.board.tileEach(function (_a, piece, pieceMoves, pieceCaptures) {
          var row = _a.row, col = _a.col;
          var tileElement = _this.tiles[row][col];
          var move = moveKeys.includes(key(row, col)) ? moveInner : "";
          var format = function (id, className) { return _this.game.board.pieces[id].shape(); };
          tileElement.innerHTML = "\n        <div class=\"move\">" + move + "</div>\n        <div class=\"moves\">\n          " + _this.game.board.tilesPiecesBlackMoves[row][col].map(function (id) { return format(id, "black"); }).join("") + "\n          " + _this.game.board.tilesPiecesWhiteMoves[row][col].map(function (id) { return format(id, "white"); }).join("") + "\n        </div>\n        <div class=\"captures\">\n          " + _this.game.board.tilesPiecesBlackCaptures[row][col].map(function (id) { return format(id, "black"); }).join("") + "\n          " + _this.game.board.tilesPiecesWhiteCaptures[row][col].map(function (id) { return format(id, "white"); }).join("") + "\n        </div>\n      ";
          if (piece) {
              tileElement.classList.add("occupied");
              var pieceElement = _this.pieces[piece.data.id];
              pieceElement.style.setProperty("--pos-col", Utils.colToInt(col).toString());
              pieceElement.style.setProperty("--pos-row", Utils.rowToInt(row).toString());
              pieceElement.style.setProperty("--scale", "1");
              pieceElement.classList[(pieceMoves === null || pieceMoves === void 0 ? void 0 : pieceMoves.length) ? "add" : "remove"]("can-move");
              pieceElement.classList[(pieceCaptures === null || pieceCaptures === void 0 ? void 0 : pieceCaptures.length) ? "add" : "remove"]("can-capture");
              if (piece.updateShape) {
                  piece.updateShape = false;
                  pieceElement.innerHTML = piece.shape();
              }
          }
          else {
              tileElement.classList.remove("occupied");
          }
      });
  };
  View.prototype.drawPositions = function (moves, captures) {
      var _this = this;
      moves === null || moves === void 0 ? void 0 : moves.forEach(function (_a) {
          var _b, _c;
          var row = _a.row, col = _a.col;
          _this.tiles[row][col].classList.add("highlight-move");
          (_c = _this.pieces[(_b = _this.game.board.tileFind({ row: row, col: col })) === null || _b === void 0 ? void 0 : _b.data.id]) === null || _c === void 0 ? void 0 : _c.classList.add("highlight-move");
      });
      captures === null || captures === void 0 ? void 0 : captures.forEach(function (_a) {
          var _b, _c;
          var row = _a.row, col = _a.col, capture = _a.capture;
          if (capture) {
              row = capture.row;
              col = capture.col;
          }
          _this.tiles[row][col].classList.add("highlight-capture");
          (_c = _this.pieces[(_b = _this.game.board.tileFind({ row: row, col: col })) === null || _b === void 0 ? void 0 : _b.data.id]) === null || _c === void 0 ? void 0 : _c.classList.add("highlight-capture");
      });
  };
  View.prototype.drawResetClassNames = function () {
      document.querySelectorAll(".highlight-active").forEach(function (element) { return element.classList.remove("highlight-active"); });
      document.querySelectorAll(".highlight-capture").forEach(function (element) { return element.classList.remove("highlight-capture"); });
      document.querySelectorAll(".highlight-move").forEach(function (element) { return element.classList.remove("highlight-move"); });
  };
  View.prototype.handleTileClick = function (location) {
      var _a = this.game.activate(location), activePieceId = _a.activePieceId, capturedPieceId = _a.capturedPieceId, _b = _a.moves, moves = _b === void 0 ? [] : _b, _c = _a.captures, captures = _c === void 0 ? [] : _c, type = _a.type;
      this.drawResetClassNames();
      if (type === "TOUCH") {
          var enPassant = captures.find(function (capture) { return !!capture.capture; });
          var passingMoves = enPassant ? moves.concat([enPassant]) : moves;
          this.drawPiecePositions(passingMoves, this.game.board.pieces[activePieceId].shape());
      }
      else {
          this.drawPiecePositions();
      }
      if (type === "CANCEL" || type === "INVALID") {
          return;
      }
      if (type === "MOVE" || type === "CAPTURE") {
      }
      else {
          this.drawActivePiece(activePieceId);
      }
      if (type === "TOUCH") {
          this.drawPositions(moves, captures);
      }
      else if (type === "CAPTURE") {
          this.drawCapturedPiece(capturedPieceId);
      }
      // crazy town
      // this.setPerspective(this.game.turn);
  };
  View.prototype.setPerspective = function (perspective) {
      var other = perspective === "WHITE" ? "perspective-black" : "perspective-white";
      var current = perspective === "WHITE" ? "perspective-white" : "perspective-black";
      this.element.classList.add(current);
      this.element.classList.remove(other);
  };
  return View;
}());
var Control = /** @class */ (function () {
  function Control(game, view) {
      this.inputSpeedAsap = document.getElementById("speed-asap");
      this.inputSpeedFast = document.getElementById("speed-fast");
      this.inputSpeedMedium = document.getElementById("speed-medium");
      this.inputSpeedSlow = document.getElementById("speed-slow");
      this.inputRandomBlack = document.getElementById("black-random");
      this.inputRandomWhite = document.getElementById("white-random");
      this.inputPerspectiveBlack = document.getElementById("black-perspective");
      this.inputPerspectiveWhite = document.getElementById("white-perspective");
      this.game = game;
      this.view = view;
      this.inputPerspectiveBlack.addEventListener("change", this.updateViewPerspective.bind(this));
      this.inputPerspectiveWhite.addEventListener("change", this.updateViewPerspective.bind(this));
      this.updateViewPerspective();
  }
  Object.defineProperty(Control.prototype, "speed", {
      get: function () {
          if (this.inputSpeedAsap.checked) {
              return 50;
          }
          if (this.inputSpeedFast.checked) {
              return 250;
          }
          if (this.inputSpeedMedium.checked) {
              return 500;
          }
          if (this.inputSpeedSlow.checked) {
              return 1000;
          }
      },
      enumerable: false,
      configurable: true
  });
  Control.prototype.autoplay = function () {
      var input = this.game.turn === "WHITE" ? this.inputRandomWhite : this.inputRandomBlack;
      if (!input.checked) {
          setTimeout(this.autoplay.bind(this), this.speed);
          return;
      }
      var position = this.game.randomMove();
      this.view.handleTileClick(position);
      setTimeout(this.autoplay.bind(this), this.speed);
  };
  Control.prototype.updateViewPerspective = function () {
      this.view.setPerspective(this.inputPerspectiveBlack.checked ? "BLACK" : "WHITE");
  };
  return Control;
}());
var DEMOS = {
  castle1: "XD8B3,B1X,C1X,D1X,F1X,G1X",
  castle2: "XD8B3,B1X,C1X,C2X,D1X,F1X,G1X",
  castle3: "XD8E3,B1X,C1X,F2X,D1X,F1X,G1X",
  promote1: "E1,E8,C2C7",
  promote2: "E1,E8E7,PC2C8",
  start: "XE7E6,F7F5,D2D4,E2E5",
  test2: "C8E2,E8,G8H1,D7E4,H7H3,PA2H7,PB2G7,D2D6,E2E39,A1H2,E1B3",
  test: "C8E2,E8,G8H1,D7E4,H7H3,D1H7,PB2G7,D2D6,E2E39,A1H2,E1B3",
};
var initialPositions = Utils.getInitialPiecePositions();
// const initialPositions = Utils.getPositionsFromShortCode(DEMOS.castle1);
var initialTurn = "WHITE";
var perspective = "WHITE";
var game = new Game(Utils.getInitialPieces(), initialPositions, initialTurn);
var view = new View(document.getElementById("board"), game, perspective);
var control = new Control(game, view);
control.autoplay();
